var scene,sceneImg;
var hotAirBalloon;
var hotAirBalloonAnimation;

function preload(){
   sceneImg = loadImage("Hot Air Ballon-01.png");
   hotAirBalloonAnimation = loadAnimation("Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);
 
  //database
  database = firebase.database();
  console.log(database);
  
  //scene
  scene = createSprite(250,250);
  scene.addImage(sceneImg);
  scene.scale = 0.3;
  
  //hotAirBalloon
  hotAirBalloon = createSprite(100,200);
  hotAirBalloon.addAnimation("balloon",hotAirBalloonAnimation);
  hotAirBalloon.scale = 0.3;

  //readposition
  var hotAirBalloonPosition = database.ref('balloon/position');
  hotAirBalloonPosition.on("value",readPosition,showError);
  
}

function draw() {
  background(255,255,255); 
  
  if(keyDown(LEFT_ARROW)){
    hotAirBalloon.x = hotAirBalloon.x-10;
   
  }
 else if(keyDown(RIGHT_ARROW)){
    hotAirBalloon.x = hotAirBalloon.x+10;
   
  }
  else if(keyDown(UP_ARROW)){
    hotAirBalloon.y = hotAirBalloon.y-10;
    hotAirBalloon.scale = 0.4;
  }
  else if(keyDown(DOWN_ARROW)){
    hotAirBalloon.y = hotAirBalloon.y+10;
    hotAirBalloon.scale = 0.2;
  }

  drawSprites();
  
  textSize(18);
  fill("black");
  text("Use the arrow keys to move the air balloon",10,20);
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
  'x':hotAirBalloon.x + x,
  'y':hotAirBalloon.y + y
})

}

function readPosition(data){
  position=data.val();
  hotAirBalloon.x=position.x;
  hotAirBalloon.y=position.y;
}

function showError(){
console.log("Error in writing to the database");
}
