class Barco {
    // metodo = function (funcao)
    // responsavel para criar o objeto do barco
    constructor(x, y, largura, altura, posBarco)
    {
        var configuracoes = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
            label: "barco"
        }
        
        // atributos da class barco
        this.esqueleto = Bodies.rectangle(x, y, largura, altura, configuracoes);
        this.largura = largura;
        this.altura = altura;

        
        this.imagem = loadImage("./assets/barco.png");
        this.posBarco = posBarco;
        World.add(world, this.esqueleto);
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