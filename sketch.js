const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var boatSpriteJson, boatSpriteImg;
var brokenBoatSpriteJson, brokenBoatSpriteImg;
var waterSplashJson, waterSplashImg;
var balls = [];
var boats = [];
var waterSplahAnimation = [];
var brokenBoatAnimation = []
var boatAnimation = []
var isGameOver = false;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  boatSpriteJson = loadJSON("./assets/boat/boat.json");
  boatSpriteImg = loadImage("./assets/boat/boat.png");

  brokenBoatSpriteJson = loadJSON("./assets/boat/brokenBoat.json");
  brokenBoatSpriteImg = loadImage("./assets/boat/brokenBoat.png");

  waterSplashJson = loadJSON("./assets/waterSplash/waterSplash.json");
  waterSplashImg = loadImage("./assets/waterSplash/waterSplash.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  var boatFrames = boatSpriteJson.frames;
  for (let i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpriteImg.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatSpriteJson.frames;
  for (let i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpriteImg.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashJson.frames;
  for (let i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashImg.get(pos.x, pos.y, pos.w, pos.h);
    waterSplahAnimation.push(img);
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }

  cannon.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();

    if (ball.body.position.x >= width) {
      // fazer
    }

    if (ball.body.position.y  >= height - 50) {
      ball.remove(index);
    }
  }
}

function showBoats() 
{
  // se já tiverem outros navios irá criar outros
  if (boats.length > 0) {
    
    if(boats[boats.length - 1] === undefined || 
      boats[boats.length - 1].body.position.x < width - 300) {
      
      var positions = [- 40, - 60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width, 
        height - 100, 
        170, 
        170, 
        position,
        boatAnimation
      );

      boats.push(boat);
    }

    for (let i = 0; i < boats.length; i++) {
      if(boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {x: -0.9, y:0});
        boats[i].display();
        boats[i].animate();
        
        var collision = Matter.SAT.collides(tower, boats[i].body);
        
        if (collision.collided && !boats[i].isBroken) {
          isGameOver = true;
          gameOver();
        }
      }
      
    }

  } else {
    // se ainda nao tiver navio vai criar o primeiro navio
    var boat = new Boat (width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}

function collisionWithBoat(index)
{
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
      if (collision.collided) {

        // verifica se o barco já está quebrado, e só quebra quando não foi quebrado ainda
        if (!boats[i].isBroken) {
          boats[i].remove(i);
        }

        World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function gameOver()
{
  swal(
    {
      title: "Fim de Jogo!",
      text: "Obrigada por jogar!",
      imageUrl: "./assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar novamente"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

}