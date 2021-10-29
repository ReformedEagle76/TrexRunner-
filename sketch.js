//Variable Creation
var gameOver,gameOverImg;
var restart,restartImg;
var score = 0;
var trex, trex_run, trex_collided;
var edges;
var ground;
var cloud, cloudImg;
var ob1,ob2,ob3,ob4,ob5,ob6;
var cloudsGroup,obstaclesGroup;
var jumpSound,checkPointSound,dieSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  trex_run=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");

  trex_collided = loadAnimation("trex_collided.png");
  
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");

  jumpSound = loadSound("jump.wav");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  }
function setup(){
  
  createCanvas(1500,200);
  
  trex= createSprite(50,180,10,40);
  trex.addAnimation("Trex",trex_run);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  
  ground = createSprite(1200,190,600,5);
  ground.addImage(groundImg)
  ground.velocityX=-(4+3*score/100);
 
  ground2 = createSprite(300,200,600,10);
  ground2.visible=false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

}
function draw(){
  
  background("white");
  
   console.log(gameState);
  
  text("Score:"+score,500,20);


if(gameState==PLAY){
      ground.velocityX=-4;
      if(obstaclesGroup.isTouching(trex)){

          gameState = END;
          dieSound.play();

        } 
  
    score = score+Math.round(getFrameRate()/60);
  
    if(keyDown("space") && trex.y>170){
        trex.velocityY=-10;
        jumpSound.play();
      }
  
      trex.velocityY=trex.velocityY + 0.5;
  
    if(ground.x < 0){
      
      ground.x=ground.width/2;
      
    }
    
       if(trex.y<170){
     trex.changeImage("Trex",);
     }
    
    else{
      trex.changeAnimation("Trex",trex_run);
    }
 
     if(score%100==0 && score>0){
     checkPointSound.play();
    }
       spawnObstacles();
       createClouds();
} 
 else if(gameState == END){
   
  ground.velocityX=0;
  trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-1)

  gameOver = createSprite(width/2,height/2,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5; 

  restart = createSprite(width/2,height/2 + 40,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.5;

  trex.changeAnimation("collided")
}


  trex.collide(ground2); 
  if(mousePressedOver(restart)){
    console.log("restart the game:")
    reset();
  }
  drawSprites();
  
}

function reset(){
  gameState = PLAY
  score = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
}

function createClouds(){
  var rand = Math.round(random(60,100));
  //console.log(rand);
  
  if(frameCount%80==0){
    
    cloud = createSprite(580,70,40,11);
    cloud.addImage(cloudImg);
    cloud.y = rand;
    cloud.scale = 0.5   
    cloud.velocityX = -4;
    trex.depth = cloud.depth;
    trex.depth ++;  
    cloudsGroup.add(cloud);
    cloud.lifetime = 140;
    }
}

function spawnObstacles(){
  
    if(frameCount%80==0){
    var r = Math.round(random(1,6));
    var obstacle = createSprite(600,170,40,11);
      
    obstacle.velocityX=-(6+score/100);
    obstacle.scale=0.5;
     switch(r){
      case 1: obstacle.addImage(ob1);
        break;
        case 2:obstacle.addImage(ob2);
        break;
         case 3:obstacle.addImage(ob3);
        break;
         case 4:obstacle.addImage(ob4);
        break;
         case 5:obstacle.addImage(ob5);
        break;
         case 6:obstacle.addImage(ob6);
        break;
        default : console.log("Invalid number");
        break;
     }
    obstacle.lifetime = 140;
    obstaclesGroup.add(obstacle)
}
}




 
