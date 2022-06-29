const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Objeto = Matter.Body;

var engine, world, backgroundImg;
var canvas, angulo, tower, ground, cannon;
var cannonBall;
// vetor que guarda as bolas
var bolas = [];
var barcos = [];

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
  angulo = 20;

  // criando o chao
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  // adicionando o chao ao mundo
  World.add(world, ground);

  // criando a torre
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  // adicionando a torre ao mundo
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angulo);
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
    mostrarBolasCanhao(bolas[i], i);
    
  }
  cannon.mostrar();
  mostrarBarcos();

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

function mostrarBarcos()
{
  if (barcos.length > 0) {
    if (barcos[barcos.length - 1]  === undefined ||
      barcos[barcos.length - 1].esqueleto.position.x < width-300) {
      var positions=[-40,-60,-70,20];
      var position= random(positions);
      var barco=new Barco(width,height-100,170,170,position);
      barcos.push(barco);
    }
    for (let i = 0; i < barcos.length; i++) {
      if (barcos[i]) {
        Objeto.setVelocity(barcos[i].esqueleto,{
          x:-0.9,
          y: 0
        });
        barcos[i].mostrar();
      }
      
    }
  } else {
    // criacao do primeiro barco
    var barco = new Barco(width -79, height -60, 170, 170, -80);
    barcos.push(barco);
  }
}
