class CannonBall {

  constructor(x, y) {
    var options = {
      isStatic: true
    };

    this.raio = 30;
    this.velocidade = 0.05;
    this.body = Bodies.circle(x, y, this.raio, options);

    this.image = loadImage("./assets/cannonball.png");
    // this.animation = [this.image];
    World.add(world, this.body);
  }


  mostrar() 
  {
    var angulo = this.body.angle;
    var pos = this.body.position;
    // var indice = floor(this.velocidade % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angulo);
    imageMode(CENTER);
    image(this.image, 0, 0, this.raio, this.raio);
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

  remover(indiceDaBola)
    {
        Objeto.setVelocity(this.body,{x:0,y:0});
        setTimeout(() => {
            World.remove(world,bolas[indiceDaBola].body);
            delete bolas[indiceDaBola];
        }, 1000);

    }
}
