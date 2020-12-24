var bg, bgImg;
var monkey, monkey_Animation, monkey_collided;
var bananaGroup, bananaImg;
var invisibleGround;
var score;
var obstacleGroup, obstacleImg;
var gameState;
var restart, restartImg;

function preload() {
  bgImg = loadImage("jungle.jpg");
  monkey_Animation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  restartImg = loadImage("restart.png");
  monkey_collided = loadImage("monkey-min.png");

}

function setup() {
  createCanvas(600, 300);

  bg = createSprite(300, 100, 0, 0);
  bg.addImage("background", bgImg);
  bg.velocityX = -4;
  bg.x = bg.width / 2;

  monkey = createSprite(100, 260, 20, 20);
  monkey.addAnimation("moving", monkey_Animation);
  monkey.scale = 0.08;

  invisibleGround = createSprite(200, 290, 400, 10);
  invisibleGround.visible = false;

  bananaGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  gameState = "play";

  restart = createSprite(300, 150, 20, 20);
  restart.addImage("resetIcon", restartImg);
  restart.scale = 0.1;


}

function draw() {
  background(255);


  if (gameState === "play") {
    restart.visible = false;

    if (bg.x < 300) {

      bg.x = bg.width / 2;
    }

    if (keyDown("space") && monkey.y > 240) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    switch (score) {
      case 10:
        monkey.scale = 0.1;
        break;
      case 20:
        monkey.scale = 0.11;
        break;
      case 30:
        monkey.scale = 0.12;
        break;
      case 40:
        monkey.scale = 0.13;
        break;
      default:
        break;
    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = "end";
    }

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score + 2;
    }
    spawnBananas();
    spawnObstacles();
  }




  monkey.collide(invisibleGround);

  if (mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
  if (gameState === "end") {
    bg.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    score = 0;
    monkey.y = 260;
    monkey.scale = 0.08;
    fill("white");
    textSize(20);
    text("GAME OVER", 250, 50);
    restart.visible = true;
  }

  fill("white");

  text("Score: " + score, 500, 50);
}

function spawnBananas() {

  if (frameCount % 70 === 0) {
    var banana = createSprite(600, 2, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage("banana", bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -6;

    banana.lifetime = 200;


    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    bananaGroup.add(banana);


  }

}

function spawnObstacles() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, 260, 40, 10);
    obstacle.addImage("stone", obstacleImg);
    obstacle.scale = 0.15
    obstacle.velocityX = -3;

    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);

  }

}

function reset() {
  gameState = "play";
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  bg.velocityX = -4;
  monkey.addImage("collided", monkey_collided);
}