class Cannon {
  constructor(x, y, width, height, angulo) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angulo = angulo;
    this.cannon_image = loadImage("assets/canon.png");
    this.cannon_base = loadImage("assets/cannonBase.png");
  }

  mostrar() {
    
    if (keyIsDown(RIGHT_ARROW) && this.angulo < 70) {
      console.log(this.angulo);
      this.angulo += 0.02;
    }
    
    if (keyIsDown(LEFT_ARROW) && this.angulo > -30) {
      console.log(this.angulo);
      this.angulo -= 0.02;
    }

    push();
    translate(this.x, this.y);
    rotate(this.angulo);
    imageMode(CENTER);
    image(this.cannon_image, 0, 0, this.width, this.height);
    pop();
    image(this.cannon_base, 70, 20, 200, 200);
    noFill();
  }
}