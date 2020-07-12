//Global Variables
var bananaimage,ostacleimage,obstacleGroup,score=0,backimage,Background,monkey,monkey_collided,
monkey_running,bananaGroup,ground,groundImage,
gameState="play";

var gameOver,restart,gameOverImage,restartimage;

function preload(){
  monkey_running=loadAnimation("Monkey_03.png",

"Monkey_02.png",
"Monkey_10.png",
"Monkey_08.png",
"Monkey_09.png",
"Monkey_07.png",
"Monkey_05.png",
"Monkey_06.png",
"Monkey_04.png");
  
  
 
  groundImage=loadImage("ground.jpg");
  backimage=loadImage("jungle.jpg");
  bananaimage=loadImage("Banana.png");
  obstacleimage=loadImage("stone.png");
  gameOverImage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  
  ground=createSprite(300,280,600,3);
  //ground.addImage(groundImage);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  
  Background=createSprite(300,40,600,180);
  Background.addImage("backGround",backimage);
  Background.scale=1.2;
  Background.velocityX=-4;
  Background.x=Background.width/2;

  monkey=createSprite(80,270,30,30);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.1;
  
  gameOver=createSprite(250,150);
  gameOver.addImage(gameOverImage);
 
  
  restart=createSprite(250,190);
  restart.addImage(restartimage);
  restart.scale=0.5;
 
  
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();  
}


 
function draw(){
 background(255); 
  
gameOver.visible=false;
restart.visible=false;
monkey.visible=true;  
  
 //console.log(monkey.y);
if(gameState==="play"){

    if(Background.x<0){
       Background.x=Background.width/2;
    } 
  
    
      
    if(ground.x<0){
      ground.x=ground.width/2;
     }   
  
    if(bananaGroup.isTouching(monkey)){
      score=score+2;
      bananaGroup.destroyEach(); 
     }
  
    if(monkey.isTouching(obstacleGroup)){
      gameState="over";
     }
            
    if(keyDown("space")&&monkey.y>=247.85){
      monkey.velocityY=-10;
     }   
      
    monkey.velocityY=monkey.velocityY+0.5;   
  
    
              
    food();
    obstacle();

    }

else if(gameState==="over"){
   
     gameOver.visible=true;
     restart.visible=true;

    Background.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  
     if(mousePressedOver(restart)){
        gameState="play";
        Background.velocityX=-4; 
        score=0; 
        bananaGroup.destroyEach(); 
        obstacleGroup.destroyEach();
     }
 
  
}  
  
   drawSprites();
   text("score: "+score,500,50);
   monkey.collide(ground);  
}


function food(){
  
      if(World.frameCount%80===0){
        var banana = createSprite(600,300,10,10);
        banana.addImage(bananaimage);
        banana.scale=0.03;
        banana.velocityX=-4;
        banana.y=random(120,180);
        banana.lifetime=-200;
         bananaGroup.add(banana);
        
      }
}

  function obstacle(){
    
      if(World.frameCount%300===0){
        var stone = createSprite(600,280,10,10);
        stone.velocityX=-4;
        stone.addImage(obstacleimage);
        stone.scale=0.1;
        obstacleGroup.add(stone);
        stone.lifetime=-200;
      }
}
