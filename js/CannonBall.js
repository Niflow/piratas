class CannonBall {

  constructor(x, y) {
    var options = {
      isStatic: true
    };

    this.raio = 30;
    this.velocidade = 0.05;
    this.body = Bodies.circle(x, y, this.raio, options);

    this.image = loadImage("./assets/cannonball.png");
    this.animacao = [this.image];
    World.add(world, this.body);
  }


  mostrar() 
  {
    var angulo = this.body.angle;
    var pos = this.body.position;
    var movimento = floor(this.velocidade % this.animacao.length);

    push();
    translate(pos.x, pos.y);
    rotate(angulo);
    imageMode(CENTER);
    image(this.animacao[movimento], 0, 0, this.raio, this.raio);
    pop();
  }

  atirar()
  {
    var novoangulo = cannon.angulo - 28;
    novoangulo = novoangulo *(3.14/180);

    var velocidade = p5.Vector.fromAngle(novoangulo);
    velocidade.mult(0.5);

    Objeto.setStatic(this.body, false);
    Objeto.setVelocity(this.body, { 
      x: velocidade.x *(180/3.14), 
      y: velocidade.y * (180/3.14)
    });
  }

  animar()
{
  this.velocidade += 0.05
}
  remover(indiceDaBola)
    {
        Objeto.setVelocity(this.body,{x:0,y:0});
        this.animacao = aguaEspirraAnimacao;
        this.velocitidade = 0.05;
        this.raio = 100;
        setTimeout(() => {
            World.remove(world, this.body);
            delete bolas[indiceDaBola];
        }, 1000);
    }
}
