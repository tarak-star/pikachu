var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pikachu;
var pikachuimage;
var backgroundimage;
var ground;
var score=0;
  score = 0;
function preload(){
   backgroundimage =loadImage("pokemon.png");
   pikachuimage =loadImage("pikachu2.png");
   obstacle1=loadImage("1.png");
   obstacle2=loadImage("2.png")
   obstacle3=loadImage("33.png");
   restartImg = loadImage("restart.png");
   score=0
}
function setup(){
   
    createCanvas(500,500);
   ground = createSprite(250,400,5000,10);
   pikachu = createSprite(30,360,20,20);
   pikachu.addImage("running",pikachuimage)
   pikachu.scale = 0.3;
   restart = createSprite(250,250);
   restart.addImage(restartImg);
   
  obstaclesGroup = new Group();
} 

function draw(){
    background(backgroundimage);
     console.log(mouseX+","+mouseY);
     textSize(20)
     text("Score: "+ score, 400,50);
     if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
      
        if(keyDown("space") && pikachu.y >= 250) {
            pikachu.velocityY = -12;
        }
      
        pikachu.velocityY = pikachu.velocityY + 0.8
      
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
      
        pikachu.collide(ground);
        //spawnClouds();
        spawnObstacles();
      
        if(obstaclesGroup.isTouching(pikachu)){
            gameState = END;
        }
        restart.visible = false;
      }
      else if (gameState === END) {
       // gameOver.visible = true;
        restart.visible = true;
        
        //set velcity of each game object to 0
        ground.velocityX = 0;
        pikachu.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
       // cloudsGroup.setVelocityXEach(0);
        
        //change the trex animation
        //trex.changeAnimation("collided",trex_collided);
        
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        //cloudsGroup.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
  
     
    drawSprites();
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(500,370,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.1;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
  function reset(){
    gameState = PLAY;
   // gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
   // cloudsGroup.destroyEach();
    
   // trex.changeAnimation("running",trex_running);
    
   
    
    score = 0;
    
  }
