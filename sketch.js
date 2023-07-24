//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variaveis da raquete do oponete
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let trilha;
let raquetada;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup(){
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  meio();
  bolinha();
  velocidadeBolinha();
  colisaoBordas();
  raquete(xRaquete, yRaquete);
  raquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteP1();
  colisaoRaqueteP1();
  colisaoRaqueteOponente();
  movimentaRaqueteOponente();
  mostraPlacar();
  marcaPontos();
  bolinhaNaoFicaPresa();
  fimDeJogo();
}

function bolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function meio(){
  line(300, 0, 300, 400);
  stroke(300);
}

function velocidadeBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBordas(){
  if (xBolinha + raio> width ||
      xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio> height ||
      yBolinha - raio< 0){
    velocidadeYBolinha *= -1;
  }
}

function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
      xBolinha = 300
    }
  if (xBolinha + raio > 600){
      xBolinha = 300
  }
}

function raquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaqueteP1(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 11;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 11;
  }
  
  yRaquete = constrain(yRaquete, 0, 310);
}

function colisaoRaqueteP1(){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteOponente(){
  if (xBolinha + raio > xRaqueteOponente - comprimentoRaquete && yBolinha - raio < yRaqueteOponente + alturaRaquete && yBolinha + raio > yRaqueteOponente){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }  
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar; 
  calculaChanceDeErrar();
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 30
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 30
    }
  }
}

function mostraPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPontos(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function fimDeJogo(){
  if (meusPontos === 7){
    textSize(30)
    text('victory', 300, 200)
    mostraPlacar();
    noLoop();
  }
  if (pontosOponente === 7){
    textSize(30)
    text('defeat', 300, 200)
    mostraPlacar();
    noLoop()
  }
}
