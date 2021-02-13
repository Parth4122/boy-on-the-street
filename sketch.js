var PLAY=1;
var END=0;
var gameState=PLAY;

var path,boy,cash,diamonds,jwellary,sword,edges;
var pathImg,boyImg,cashImg,diamondsImg,jwellaryImg,swordImg;
var treasureCollection = 0;
var diamondsCollection = 0;
var jwellaryCollection = 0;
var cashG,diamondsG,jwellaryG,swordGroup;
var gameover,gameoverImage;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwellaryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImage =loadImage("gameOver.png");  
}

function setup(){
  createCanvas(400, 400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  boy.setCollider("circle",0,0,40);
  boy.debug = false;
  
cashG=new Group();
diamondsG=new Group();
jwellaryG=new Group();
swordGroup=new Group();
  
  gameover=createSprite(200,200,10,11);
  gameover.addImage(gameoverImage);
  gameover.scale=0.7;
  gameover.visible=false;
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
edges = createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = width/2;
  }
  
    createCash();
    createDiamonds();
    createJwellary();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+100;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
     treasureCollection=treasureCollection+50;
      
    }else if(jwellaryG.isTouching(boy)) {
      jwellaryG.destroyEach();
      treasureCollection=treasureCollection+25;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        
        gameState=END;
        boy.addAnimation("SahilRunning",gameoverImage);
        gameoverImage=true;
     
    }
  }
  
  if(gameState===END)
  {
    swordGroup.destroyEach();
        jwellaryG.destroyEach();
        diamondsG.destroyEach();
        cashG.destroyEach();
    gameover.visible=true;
    path.velocityY = 0;
  }

  drawSprites();
  textSize(20);
  fill(255); 
  text("Treasure:" + treasureCollection,150,30);
  //text("Diamonds:" + diamondsCollection,150,70);
  //text("Jwellary:" + jwellaryCollection,150,110);
  //text("gameoverImage:" +gameoverImage,150,150);

}
function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellary() {
  if (World.frameCount % 100 == 0) {
  var jwellary = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellary.addImage(jwellaryImg);
  jwellary.scale=0.13;
  jwellary.velocityY = 3;
  jwellary.lifetime = 150;
  jwellaryG.add(jwellary);
  }
}

function createSword(){
  if (World.frameCount %100 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}