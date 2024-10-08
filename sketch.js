//Variáveis da bolinha.
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//Variáveis de velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

let raqueteLargura = 10;
let raqueteAltura = 90;

//Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Variá veis de colisão e marcação de pontos
let colisao = false;
let meusPontos = 0;
let pontosOponente = 0;

let chanceDeErrar = 0;

//Variáveis que guardam sons do game
let raquetada;
let pontuacao;
let trilhaSonora;

// Função que pré carregha os sons do game nas variáveis, embora seja uma função declarada pelo programador, é um nome reservado e deve ser declarado com este exato nome, foi declarasda antes do setup() por fins didáticos, mas pode ser declarada mais abaixo como as outras funções
function preload()
{
  raquetada = loadSound("raquetada.mp3");
  pontuacao = loadSound("ponto.mp3");
  trilhaSonora = loadSound("trilha.mp3");
}

//Função que cria a tela
function setup() 
{
  createCanvas(600, 400);
  //Toca em loop o som da variável trilhaSonora, esta função loop() é chamada aqui pois setup() é a primeira função do alrítmo a ser executada
  trilhaSonora.loop();
}

//Função principal do programa, é executada em loop.
function draw() 
{
  background(0);
  mostrarBolinha();
  movimentarBolinha();
  verificarColisaoComABorda();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarRaquete();
  colisaoComRaqueteBiblioteca(xRaquete, yRaquete);
  movimentarRaqueteOponente();
  colisaoComRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  marcarPontos();
  incluirPlacar();
  
}
//Define as coordenadas e diâmetro da bolinha
function mostrarBolinha()
{
  circle(xBolinha, yBolinha, diametro);
}
//A função draw() é executada em loop contínuamente, movimenta a bolinha nos eixos x e y
function movimentarBolinha()
{
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
// Muda o ponto de colisão da bolinha de seu centro para a sua borda fazendo a soma do centro 
// mais o seu raio para o ponto0 de colisão se tornasr a borda, caso a bolinha bata na borda,
// sua direção é invertida.
function verificarColisaoComABorda()
{
  if(xBolinha + raio > width || xBolinha - raio < 0)
    {
      velocidadeXBolinha *= -1;
    }
  if(yBolinha + raio > height || yBolinha - raio < 0)
     {
       velocidadeYBolinha *= -1;
     }
}

function mostrarRaquete(x,y)
{
  rect(x, y, raqueteLargura, raqueteAltura);
}

function movimentarRaquete()
{
  if(keyIsDown(87))
     {
       yRaquete -= 10;
     }
  if(keyIsDown(83))
    {
      yRaquete += 10;
    }
}
//Função para verificar colisão com a bolinha.
function verificarColisaoComRaquete()
{
  if (xBolinha - raio < xRaquete + raqueteLargura && yBolinha - raio < yRaquete + raqueteAltura
     && yBolinha + raio > yRaquete)
    {
      velocidadeXBolinha *= -1;
    }
}

function colisaoComRaqueteBiblioteca(x,y)
{
  //Função definida no arquivo importado p5.collide2d.js,código fornecido por terceiro.
  colisao = collideRectCircle(x, y, raqueteLargura, raqueteAltura, xBolinha, yBolinha, raio);
  if(colisao)
    {
      velocidadeXBolinha *= -1;
      //Toca o som contido na variável raquetada
      raquetada.play();
    }
}

function movimentarRaqueteOponente()
{
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteLargura / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calcularChanceDeErrar();
}

//Mantêm as chances de erro do oponente entre 35 e 40
function calcularChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluirPlacar()
{
  //Altera o contorno de todos os elementos da tela em branco
  stroke(255);
  //Alinha a fonte no centro
  textAlign(CENTER);
  //Altera a cor do retângulo de placar para laranja
  fill(color(255, 140, 0));
  //Cria retângulo nas coordenadas 150, 10 com 40 de largura e 20 de altura
  rect(150, 10, 40, 20);
  //Define a cor da fonte como branco
  fill(255);
  //Exibe uma fonte branca (por conte do método fill()) nas coordenadas fornecidas
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

//Altera o valor das variáveis de marcação de pontos com base na coordenada x da bolinha, se a bola bater no canto direito o usuário marca ponto, caso bata no lado esquerdo, a cpu faz ponto 
function marcarPontos()
{
  if(xBolinha + raio > 599)
     {
       meusPontos ++;
       //Toca o son da variável pontuacao
       pontuacao.play();
     }
  if(xBolinha - raio < 1)
    {
      pontosOponente ++;
      //Toca o son da variável pontuacao
      pontuacao.play();
    }
}