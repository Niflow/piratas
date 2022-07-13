class Barco {
    // metodo = function (funcao)
    // responsavel para criar o objeto do barco
    constructor(x, y, largura, altura, posBarco, barcoAnimacao)
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

        this.animacao = barcoAnimacao;
        this.velocidade = 0.05;
        
        this.imagem = loadImage("./assets/barco.png");
        this.posBarco = posBarco;
        World.add(world, this.esqueleto);
    }

    mostrar()
    {
        var angulo = this.esqueleto.angle;
        var pos = this.esqueleto.position;
        var movimento = floor(this.velocidade % this.animacao.length);

        push();
        translate(pos.x, pos.y);
        rotate(angulo);
        imageMode(CENTER);
        image(this.animacao[movimento], 0, this.posBarco, this.largura, this.altura);
        pop();
    }

    animar()
    {
        this.velocidade += 0.05;
    }

    remover(indiceDoBarco)
    {
        // para a velocidade do barco
        Objeto.setVelocity(this.esqueleto,{x:0,y:0});
        // apaga o barco do mundo e do vetor barcos
        setTimeout(() => {
            World.remove(world,barcos[indiceDoBarco].esqueleto);
            delete barcos[indiceDoBarco];
        }, 1000);

    }
}