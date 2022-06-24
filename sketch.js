const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
// vetor que guardarah as bolas
var bolas = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  // criando motor de fisica
  engine = Engine.create();
  // criando o mundo
  world = engine.world;
  angle = 20;

  // criando o chao
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  // adicionando o chao ao mundo
  World.add(world, ground);

  // criando a torre
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  // adicionando a torre ao mundo
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  // desenhando o chao
  rect(ground.position.x, ground.position.y, width * 2, 1);
  
  push(); // congela a configuração anterior
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop(); // volta a configuração original

  for (let i = 0; i < bolas.length; i++) {
    mostrarBolasCanhao(bolas[i],i);
    
  }
  cannon.display();
  
}

// funcao tecla pressionada
function keyPressed()
{
  // if eh uma condicao
  if (keyCode === DOWN_ARROW) {
    var bolaCanhao = new CannonBall(cannon.x, cannon.y);
    bolas.push(bolaCanhao);
  }
}

function keyReleased(){
  if (keyCode === DOWN_ARROW) {
    bolas[bolas.length -1].atirar();
  }
}

function mostrarBolasCanhao(bola, indiceDaBola)
{
  if (bola) {
    bola.display();
  }
}
