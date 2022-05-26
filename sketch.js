//Variabeis Bolinha
var xBolinha = 300;
var yBolinha = 200;
var diametro = 16;
var raio = diametro / 2;

//Variavel veloc. e sent. Bolinha
var velocidadeXBolinha = 3.5;
var velocidadeYBolinha = 3.5;
var raqueteAltura = 6
var raqueteComprimento = 50

//Variaveis da Raquete
var xRaquete = 3
var yRaquete = 175

//variaveis do oponente 
var xRaqueteOponente = 591;
var yRaqueteOponente = 175;
var velocidadeYOponente;
var chanceDeErrar = 0;

var colisao = false;

//Placar do Jogo
var meusPontos = 0;
var pontosDoOponente = 0;
var vs = "VS";

//Sons do Jogo
var raquetada;
var ponto;
var trilhasonora;

/*-----------------------------------------------------------*/
//Seleção de Multiplayers
function movimentoMultiplayers() {
  if (keyIsDown(SHIFT) && yRaquete > 0) {
    yRaquete -= 6;
  }
  if (keyIsDown(CONTROL) && yRaquete + raqueteComprimento < height) {
    yRaquete += 6;
  }
}

function moveYourPaddle() {
  if (keyIsDown(UP_ARROW) && yRauqteOponente > 0) {
    yPaddle2 -= 6;
  }
  if (keyIsDown(DOWN_ARROW) && yRaqueteOponente + raqueteComprimento < height) {
    yRaqueteOponente += 6;
  }
}

/*-------------------------------------------------------------*/

function preload() {
  trilhasonora = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

//Tamanho da tela
function setup() {
  createCanvas(600, 400);
  trilhasonora.loop();
}

//Funções 
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificacaoBordas();
  //movimentoMultiplayers();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //meucodVerificacaoColisaoRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  movimentaRaqueteOponente();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //meucodVerificacaoColisaoRaqueteOponente();
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente)
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();  
  calculaChanceDeErrar();
}

//Codigo e Condições
function mostraBolinha() {
   circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificacaoBordas() {
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}

function mostraRaquete(x, y) {
  rect(x, y,raqueteAltura,raqueteComprimento)
  }

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -=10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete +=10;
 }
}

function meucodVerificacaoColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteAltura && yBolinha - raio < yRaquete + raqueteComprimento && yBolinha + raio > yRaquete ) { 
    velocidadeXBolinha *= -1;
    raquetada.play();
 }
}

function meucodVerificacaoColisaoRaqueteOponente() {
  if (xBolinha + raio > xRaqueteOponente - raqueteComprimento && yBolinha + raio > yRaqueteOponente - raqueteAltura && yBolinha + raio < yRaqueteOponente) { 
    velocidadeXBolinha *= -1;
    raquetada.play();
 }
}

function verificaColisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, raqueteAltura, raqueteComprimento, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
   velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 -10;
   yRaqueteOponente += velocidadeYOponente + chanceDeErrar
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  text(vs, 295, 26)
  textSize(20);
  fill(255, 140, 0);
  rect(195, 7, 50, 25);
  fill(255);
  text(meusPontos, 220, 26);
  fill(255, 140, 0);
  rect(345, 7, 50, 25);
  fill(255);
  text(pontosDoOponente, 370, 26);
  fill(255);
}

function selecaoVsOuComp() {
  stroke(28, 28, 28);
  textSize(20);
  text(selecao01, 560, 26);
  rect(520, 7, 70, 25);

}

function player2() {
  rect(570, 15, 15, 15);
}

function marcaPonto(){
  if (xBolinha > 593){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 7){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function calculaChanceDeErrar() {
   if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
   if (chanceDeErrar >= 4){
    chanceDeErrar = 5
    }
  } else {
    chanceDeErrar -= 1
   if (chanceDeErrar <= 5){
    chanceDeErrar = 5
    }
  }
}