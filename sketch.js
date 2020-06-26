//Global Variables
var score,gameState
var restart,restartImg
var gameOver,gameImg;
var trex, trex_running;
var ground, invisibleGround, groundImage;
var bananaGroup,BananaImage;
var obstaclesGroup,stoneImage;

function preload(){
  
  trex_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  groundImage = loadImage("ground.jpg");
  
  bananaImage = loadImage("Banana.png");
  
  stoneImage = loadImage("stone.png");
  
  restartImg = loadImage("restart.png");
  
  gameImg = loadImage("gameOver.png");
  
 
}

function setup() {
  createCanvas(300, 400);
  
   gameState = 0
  
  score = 500;
  
  invisibleGround = createSprite(0,390,400,10);
  ground = createSprite(200,245);
  ground.addAnimation("groun",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  ground.scale = 1;
  
  //invisibleGround.visible = false;
  
  trex = createSprite(50,360,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.075;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group(); 
  
  restart = createSprite(150,100);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameOver = createSprite(150,60);
  gameOver.addImage(gameImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  
}

function draw() {
  background(180);
  
    score = score -  Math.round(getFrameRate()/45);
  
  trex.collide(invisibleGround);
  if(gameState == 0){
      if(keyDown("space")&&trex.y >319) {
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.8
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(cloudsGroup.isTouching(trex)){
      trex.scale = trex.scale + 0.01
     
      cloudsGroup.destroyEach();
    }
    if(obstaclesGroup.isTouching(trex)){
      trex.scale = trex.scale - 0.03
     
      obstaclesGroup.destroyEach();
    }
    if((trex.scale-0.02)<=-0){
    gameState = 1
     }
    if (score<=0){
  gameState = 1
   }
     }
 
   else if(gameState === 1) {
    gameOver.visible = true;
    restart.visible = true;
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   score = 0
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  
   
  
  
   
  spawnClouds()
  spawnObstacles() 
  drawSprites();
  text("Score: "+ score, 50, 50);
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,290,40,10);
    
    cloud.addAnimation("banan",bananaImage);
    cloud.scale = 0.05;
    cloud.velocityX = -6;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,380,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    obstacle.addAnimation("stone",stoneImage);
    
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = 0;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score = 500;
   trex.scale = 0.08;
}

