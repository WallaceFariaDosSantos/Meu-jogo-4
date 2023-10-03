//constantes
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//variáveis
var engine, world, canvas;
var player, elementFire, elementWater, elementEarth, elementAir, elementDarkness, playerAtributes;
var backgroundImg, titleGif, controlButton, startButton;
var rat, tree, rock, money;
var cavaleiroPulando, cavaleiroAtacando, cavaleiroCaindo, cavaleiroCorrendo, cavaleiroParado, cloudImg, floorImg, lifeImage;
var monster1DImg, monster1CImg, monster1AImg;
var level1, level2, level3, level4;
var keyDownTest = false;
var level = 0;
var gameState = 0;
var playerHealth = 100;
var playerStamina = 100;
var playerLevel = 1;
var playerExp = 0;

//função preload
function preload(){
  cavaleiroAtacando = loadImage("./assets/CavaleiroAtacando.gif");
  cavaleiroPulando = loadImage("./assets/CavaleiroPulando.png");
  cavaleiroCaindo = loadImage("./assets/CaindoNoChão.gif");
  cavaleiroParado = loadImage("./assets/CavaleiroParado.gif");
  cavaleiroCorrendo = loadImage("./assets/CavaleiroCorrendo.gif");
  monster1DImg = loadAnimation("./assets/derrotado1.png", "./assets/derrotado2.png", "./assets/derrotado3.png", "./assets/derrotado4.png", "./assets/derrotado5.png", "./assets/derrotado6.png", "./assets/derrotado7.png", )
  backgroundImg = loadImage("./assets/Background.gif");
  floorImg = loadImage("./assets/groundImg.png");
  cloudImg = loadImage("./assets/cloudImg.png");
  titleGif = loadImage("./assets/title.gif");
  lifeImage = loadImage("./assets/life.png");

  cavaleiroAtacando.playing = true;
  cavaleiroCaindo.playing = true;
  cavaleiroCorrendo.playing = true;
  cavaleiroParado.playing = true;

  monster1DImg.looping = true;
  cavaleiroAtacando.looping = false;
  cavaleiroCaindo.looping = false;
  cavaleiroCorrendo.looping = true;
  cavaleiroParado.looping = true;
}

//função setup
function setup(){
//tela do jogo
  canvas = createCanvas(2000, 800);

//botões
  var botoes = new Botoes();
  botoes.display();

//engine e world
  engine = Engine.create();
  world = engine.world;

//sprites
//cavaleiro
  player = createSprite(100, 505, 20, 20);
  player.setCollider("rectangle", 0, 0, 90, 120);
  player.addImage("correndo", cavaleiroCorrendo);
  player.addImage("parado", cavaleiroParado);
  player.addImage("caindo", cavaleiroCaindo);
  player.addImage("pulando", cavaleiroPulando);
  player.addImage("atacando", cavaleiroAtacando);
  player.changeImage("parado");
  player.visible = false;

  level1 = createSprite(1000, 700, 2000, -300);
  level1.addImage("ground1", floorImg);
  level1.scale = 2.55;
  level1.visible = false;

//grupos
  cloudGroup = new Group();
  monsterLvl1G = new Group();
}


//função draw
function draw(){
  Engine.update(engine);

//condições
  if(gameState === 1){
    background(backgroundImg);
  }

  if(gameState === 0){
    background(titleGif);
  }

  if(gameState === -1){
    background("teal");

  }

  if(level === 1 || level === 2 || level === 3 || level === 4){
    background("skyblue");
    level1.visible = true;
    player.visible = true;
    createClouds();

    //texto
    fill("orange");
    stroke("black");
    textSize(24);
    text("Stamina: " + playerStamina, 200, 100, 1000);
    fill("red");
    text("Health: " + playerHealth, 200, 130, 1000);
    fill("black");
    text("Exp: " + playerExp, 200, 160, 1000);
    fill("green");
    text("Level: " + playerLevel, 200, 190, 1000);

    if(playerExp >= 50){
      playerLevel += 1;
      playerExp = playerExp -50;
    }

    if(playerStamina > 0 && playerHealth > 0){
      if(player.isTouching(monsterLvl1G) && !keyDown("e")){
        playerHealth -= 10;
        monsterLvl1G[0].destroy();
      }
      if(player.isTouching(monsterLvl1G) && keyDown("e")){
        if(playerHealth < 100){
          playerHealth += 5;
        }
        monsterLvl1G[0].destroy();
        playerExp += 5;
      }
      if(keyDown("d")){
        player.changeImage("correndo");
        player.scale = 1.1;
        player.y = 510;
        level1.velocityX = -10;
        if(frameCount % 5 === 1){
          playerStamina -= 1;
        }
        //level1 não sair da tela
        if(level1.x === 200){
          level1.x = 1000;
        }
      }
      else if(keyDown("e")){
        player.changeImage("atacando");
        player.scale = 1;
        player.y = 505;
        level1.velocityX = 0;
        if(frameCount % 5 === 1){
          playerStamina -= 2;
        };
      }
      else{
        player.changeImage("parado");
        player.scale = 1;
        player.y = 505;
        if(playerStamina < 100 && frameCount % 5 === 1 && !keyDown("e") && !keyDown("d")){
          playerStamina += 1;        
        }
        level1.velocityX = 0;
      }
    }
    else{
      player.changeImage("caindo");
      player.scale = 1;
      player.y = 505;
      level1.velocityX = 0;;
    }
  }

//chamando funções
  if(level === 1 && playerHealth > 0 && playerStamina > 0){
    createEnemy();
  }

//Barra de nível


//drawSprites
  drawSprites();
}

//outras funções que talvez sejam adicionadas
function createEnemy(){
  if(frameCount % 130 === 1){
    if(level === 1 && monsterLvl1G[0] === undefined){
      var monsterLvl1;
      monsterLvl1 = createSprite(2200, 510, 10, 100);
      monsterLvl1.addAnimation("monster1D", monster1DImg);
      monsterLvl1.setCollider("rectangle", 0, 0, 90, 150);
      monsterLvl1.scale = 0.6;
      monsterLvl1.velocityX = -8;
      monsterLvl1.lifetime = 300; 
      monsterLvl1G.add(monsterLvl1);
    }
    if(level === 2){
      var monsterLvl2;
      monsterLvl2 = createSprite(2200, 550, 10, 100);

    }
    if(level === 3){
      var monsterLvl3;
      monsterLvl3 = createSprite(2200, 550, 10, 100);

    }
    if(level === 4){
      var monsterLvl4;
      monsterLvl4 = createSprite(2200, 550, 10, 100);

    }
  }
}
function createClouds(){
  if(frameCount % 160 === 1){
    var cloud = createSprite(2200, 100, 10, 100);
    cloud.addImage("cloud", cloudImg);
    cloud.scale = random(0.25, 0.75);
    cloud.y = Math.round(random(75, 150));
    cloud.velocityX = -10;
    cloud.lifetime = 260;
    cloudGroup.add(cloud);
  }
}
