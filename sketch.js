var bg, bgImg
var player, playerImg;
var boy,boy_running,boy_standing;
var doll,doll_rotating,doll_normal;
var boy_bending;
var obstacle1Img;
var obstacle2Img;
var obstacle,obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sound;
var survivalTime=0;
var gameOver , gameOverImg;




function preload(){
bgImg = loadImage("assets/TREE.jpg")
doll_rotating=loadAnimation('assets/BACKSIDE.png');
doll_normal=loadAnimation('assets/MY GAME DOLL.png')
boy_running= loadAnimation("assets/BOY=1.png","assets/BOY=3.png","assets/BOY=4.png");
boy_bending=loadAnimation('assets/BOY BENDING.png');
boy_standing=loadAnimation('assets/BOY=4.png')
obstacle1Img=loadImage('assets/MY GAME OBSTACLE 1.gif');
obstacle2Img=loadImage('assets/MY GAME OBSTACLE 2.gif');
sound=loadSound('assets/VOICE.mp3');
gameOverImg=loadImage('assets/game over image.webp');

}

function setup(){
createCanvas(windowWidth,windowHeight);
obstacleGroup=new Group();

bg = createSprite(windowWidth/2,windowHeight/2);
bg.addImage(bgImg);
bg.scale = 2.5;
bg.velocityX= -18;

boy=createSprite(windowWidth/6,windowHeight-130);
boy.addAnimation('running',boy_running);
boy.scale=1.3;

doll=createSprite(1200,200,100,20);
doll.addAnimation('backside',doll_normal);
doll.scale=0.6;

gameOver=createSprite(600,300);
gameOver.addImage('gameover',gameOverImg)
gameOver.scale=0.9
gameOver.visible=false;


}

function draw() {
  sound.play(); 
  background("black")
    
  if (gameState===PLAY){
     
  if (bg.x <500){
    bg.x =1400
  }
  survivalTime = Math.ceil(frameCount / frameRate())
  spawnObstacles()

  
  if(obstacleGroup.isTouching(boy)){
    gameState=END
  }

}
else if (gameState===END){
  gameOver.visible=true;
bg.velocityX=0
obstacleGroup.setVelocityXEach(0);
boy.addAnimation('standing',boy_standing);
boy.changeAnimation('standing',boy_standing);
}
        drawSprites();
        stroke("black");
        textSize(20);
        fill("yellow");
        text("Survival Time: " + survivalTime+' seconds', 100, 50);
        stroke("white");
        textSize(20);
        fill("white");
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  sound.play(); 
  if(keyCode ===DOWN_ARROW){

boy.addAnimation('bending',boy_bending);
boy.scale=0.8;
boy.x=windowWidth/6+150;
boy.y=windowHeight-50
boy.changeAnimation('bending');

  }
  if(keyCode ===UP_ARROW){

    boy.addAnimation('running',boy_running);
   boy.scale=1.3;
   boy.x=windowWidth/6
   boy.y=windowHeight-130
  boy.changeAnimation('running');
    
      }
 }

 
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,300,10,40);
    obstacle.setCollider("rectangle",0,0,obstacle.width,200);
    //obstacle.debug = true;
    obstacle.velocityX = -6
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      default: break;
    }
    
            
    obstacle.scale = 1;
    //obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}

 