class Barco {
    // metodo = function (funcao)
    constructor(x, y, largura, altura, posBarco)
    {
        // atributos da class barco
        this.largura = largura;
        this.altura = altura;
        this.esqueleto = Bodies.rectangle(x, y, largura, altura);
        World.add(world, this.esqueleto);
        this.imagem = loadImage("./assets/barco.png");
        this.posBarco = posBarco;
    }

    mostrar()
    {
        var angulo = this.esqueleto.angle;
        var pos = this.esqueleto.position;

        push();
        translate(pos.x, pos.y);
        rotate(angulo);
        imageMode(CENTER);
        image(this.imagem, 0, this.posBarco, this.largura, this.altura);
        pop();
    }
}