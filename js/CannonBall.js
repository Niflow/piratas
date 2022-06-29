class CannonBall {

  constructor(x, y) {
    var options = {
      isStatic: true
    };

    this.raio = 30;
    this.body = Bodies.circle(x, y, this.raio, options);
    this.image = loadImage("./assets/cannonball.png");
    World.add(world, this.body);
  }


  display() 
  {
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.raio, this.raio);
    pop();
  }

  atirar()
  {
    var novoangulo = cannon.angulo -28;
    novoangulo = novoangulo *(3.14/180);
    var velocidade = p5.Vector.fromAngle(novoangulo);
    velocidade.mult(0.5);
    Objeto.setStatic(this.body,false);
    Objeto.setVelocity(this.body, { 
      x: velocidade.x *(180/3.14), 
      y: velocidade.y * (180/3.14)
    });
  }
}
