const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Objeto = Matter.Body;
var engine, world, backgroundImg;
var canvas, angulo, tower, ground, cannon;
var cannonBall;
var barcoJson, barcoImg, barcoAnimacao = [];
var barcoQuebradoJson, barcoQuebradoImg, barcoQuebradoAnimacao = [];
var aguaEspirraJson, aguaEspirraImg, aguaEspirraAnimacao = [];
var fimdejogo=false;
// vetor que guarda as bolas
var bolas = [];
var barcos = [];
var risadaM,explosaoM,aguaM,fundoM;
var estaRindo=false;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  barcoJson = loadJSON("./assets/barco/barco.json");
  barcoImg = loadImage("./assets/barco/barco.png");
  barcoQuebradoJson = loadJSON("./assets/barco/barcoQuebrado.json");
  barcoQuebradoImg = loadImage("./assets/barco/barcoQuebrado.png");
  aguaEspirraJson = loadJSON("./assets/aguaEspirra/aguaEspirra.json");
  aguaEspirraImg = loadImage("./assets/aguaEspirra/aguaEspirra.png");
  risadaM = loadSound('./assets/assets_pirate_laugh.mp3');
  explosaoM = loadSound('./assets/assets_cannon_explosion.mp3');
  aguaM = loadSound('./assets/assets_cannon_water.mp3');
  fundoM = loadSound('./assets/assets_background_music.mp3');
}

function setup() {
  canvas = createCanvas(1200, 600);
  // criando motor de fisica
  engine = Engine.create();
  // criando o mundo
  world = engine.world;

  angleMode(DEGREES);
  angulo = 15;

  // criando o chao
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  // adicionando o chao ao mundo
  World.add(world, ground);

  // criando a torre
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  // adicionando a torre ao mundo
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angulo);

  // para entrar em cada gaveta do vetor vamos usar o bloco for () {}
  var barcoFrames = barcoJson.frames;
  for (var gaveta = 0; gaveta < barcoFrames.length; gaveta++) {
    var pos = barcoFrames[gaveta].position;
    // get significa pegar
    var imagem = barcoImg.get(pos.x, pos.y, pos.w, pos.h);
    barcoAnimacao.push(imagem); // vetor
  }

  var barcoQuebradoFrames = barcoQuebradoJson.frames;
  for (var gaveta = 0; gaveta < barcoQuebradoFrames.length; gaveta++) {
    var pos = barcoQuebradoFrames[gaveta].position;
    // get significa pegar
    var imagem = barcoQuebradoImg.get(pos.x, pos.y, pos.w, pos.h);
    barcoQuebradoAnimacao.push(imagem); // vetor
  }

  var aguaEspirraFrames = aguaEspirraJson.frames;
  for (var gaveta = 0; gaveta < aguaEspirraFrames.length; gaveta++) {
    var pos = aguaEspirraFrames[gaveta].position;
    // get significa pegar
    var imagem = aguaEspirraImg.get(pos.x, pos.y, pos.w, pos.h);
    aguaEspirraAnimacao.push(imagem); // vetor
  }
  
}

function draw() {
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  // desenhando o chao
  push();
  translate(ground.position.x, ground.position.y);
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();
  
  push(); // congela a configuração anterior
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop(); // volta a configuração original

  mostrarBarcos();

  // repeticao = loop
  for (let i = 0; i < bolas.length; i++) {
    mostrarBolasCanhao(bolas[i], i);
    colisaoComBarco(i);  
  }

  cannon.mostrar();
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
    bolas[bolas.length - 1].atirar();
    explosaoM.play();
  }
}

function mostrarBolasCanhao(bola, indiceDaBola)
{
  if (bola) {
    bola.mostrar();
    bola.animar();
    
    if (bola.body.position.y >= height - 50) {
      if (!bola.afundou) {
        aguaM.play();
        bola.remover(indiceDaBola);
      }
    }

    if (bola.body.position.x >= width) {
      World.remove(world, bolas[indiceDaBola].body);
      delete bolas[indiceDaBola];
    }

  }
}

function mostrarBarcos()
{
  if (barcos.length > 0) {
    if (barcos[barcos.length - 1]  === undefined ||
      barcos[barcos.length - 1].esqueleto.position.x < width-300) {
      var positions=[-40,-60,-70,20];
      var position= random(positions);
      var barco=new Barco(width, height-100, 170, 170, position, barcoAnimacao);
      barcos.push(barco);
    }
    for (let i = 0; i < barcos.length; i++) {
      if (barcos[i]) {
        Objeto.setVelocity(barcos[i].esqueleto,{
          x:-0.9,
          y: 0
        });
        barcos[i].mostrar();
        barcos[i].animar();
          var colisao = Matter.SAT.collides(tower,barcos[i].esqueleto);
          if (colisao.collided && !barcos[i].estaQuebrado) {
            if (!estaRindo && !risadaM.isPlaying()) {
              risadaM.play();
              estaRindo=true;
            }
            fimdejogo = true;
            gameover();
          } 
      }
      
    }
  } else {
    // criacao do primeiro barco
    var barco = new Barco(width -79, height -60, 170, 170, -80, barcoAnimacao);
    barcos.push(barco);
  }
}

function colisaoComBarco(indiceBola)
{
  for (let i = 0; i < barcos.length; i++) {

    if (bolas[indiceBola] !== undefined && barcos[i] !== undefined) {
      var teveColisao = Matter.SAT.collides(bolas[indiceBola].body, barcos[i].esqueleto);

      // se houve colisao
      if (teveColisao.collided) {
        if (!barcos[i].estaQuebrado) {
          barcos[i].remover(i);
        }

        World.remove(world, bolas[indiceBola].body);
        delete bolas[indiceBola]; 
      }
    }
  }
}

function gameover()
{
  swal(
    {
      title: 'Fim de Jogo!',
      text: 'Obrigado por Jogar!',
      imageUrl: './assets/barco.png',
      imageSize: '150x150',
      confirmButtonText: 'jogar novamente'
    },
    function (isConfirm){
      if (isConfirm) {
        location.reload();
      }
    }
  );
}