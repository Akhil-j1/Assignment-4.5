// Font Reference: https://www.dafont.com/mabook.font
// Game Sprite Reference: https://www.kenney.nl/assets/space-shooter-redux

// Player Sprite Reference: https://www.kindpng.com/imgv/iwbwoih_spaceship-sprite-sheet-png-transparent-png/

// text font
let mabookFont;
let bgImg;

// players
let player1;
let player2;

// enemies
let NUM_OF_ENEMIES = 20;
let NUM_OF_DEAD_ENEMIES = 0;
let enemies = [];

// game state
let gameState = 0;


// player1 sprite
let player_sprite_sheet1;
let player_move1;
let player_sprite1;

// player 2 sprite
let player_sprite_sheet2;
let player_move2;
let player_sprite2;

let player_frames = [
  { name: "player_move01", frame: { x: 10, y: 10, width: 55, height: 55 } },
  { name: "player_move02", frame: { x: 235, y: 85, width: 55, height: 55 } },
];

function preload() {
  mabookFont = loadFont("assets/Mabook.ttf");
  bgImg = loadImage("assets/bgImg.png");
  player_sprite_sheet = loadSpriteSheet(
    "assets/playerSheet.png",
    player_frames
  );
  
  // players moving animation
  player_move1 = loadAnimation(player_sprite_sheet);
  player_move2 = loadAnimation(player_sprite_sheet);
}

function setup() {
  createCanvas(800, 800);
  gameSetup();
}

function draw() {
  background(220);
  if (gameState == 0) {
    welcomeScreen();
  } else if (gameState == 1) {
    storyScreen();
  } else if (gameState == 2) {
    howToPlayScreen();
  } else if (gameState == 3) {
    gameScreen();
  } else if(gameState == 4){
    gameOverScreen();
  } else if(gameState == 5){
    endGame();
  }
}

function gameSetup(){
  background(0);
  clear();
  
  NUM_OF_DEAD_ENEMIES = 0;
  // create new players
  player1 = new Player(width * 0.2, height * 0.2, 1);
  player2 = new Player(width - width * 0.2, height * 0.4, 2);
  
  // create players sprites
  player_sprite1 = createSprite(
    player1.x,
    player1.y,
    player1.size,
    player1.size
  );
  player_sprite1.addAnimation("move", player_move1);

  player_sprite2 = createSprite(
    player2.x,
    player2.y,
    player2.size,
    player2.size
  );
  player_sprite2.addAnimation("move", player_move2);
  
  // create enemies  
  for (let i = 0; i < NUM_OF_ENEMIES; i++) {
    enemies[i] = new Enemy();
  }
}

function gameScreen() {
  background(0);
  image(bgImg, 0, 0);
  for (let i = 0; i < NUM_OF_ENEMIES; i++) {
    // check if the enemies is active
    if (enemies[i].isActive) {
      // display enemies
      enemies[i].display();
      // update enemies
      enemies[i].update();
      
      // check  player1/enemy collision
      if (
        dist(
          player_sprite1.position.x,
          player_sprite1.position.y,
          enemies[i].x,
          enemies[i].y
        ) <
        player_sprite1.width / 2 + enemies[i].size / 2
      ) {
        if (player_sprite1.width > enemies[i].size) {
          // if player eat the circle increase player's size
          player_sprite1.scale += 0.05;
          enemies[i].isActive = false;
          NUM_OF_DEAD_ENEMIES += 1;
        } else {
          // if player eats bigger circle
          player1.isActive = false;
        }
      }

      // check  player2/enemy collision
      if ( dist(player_sprite2.position.x, player_sprite2.position.y, enemies[i].x, enemies[i].y) <
        player_sprite2.width / 2 + enemies[i].size / 2) {
        if (player_sprite2.width > enemies[i].size) {
          // if player eats the circle increase player's size
          player_sprite2.scale += 0.05;
          enemies[i].isActive = false;
          NUM_OF_DEAD_ENEMIES += 1;
        } else {
          // if player eats bigger circle
          player2.isActive = false;
        }
      }
    }
  }

  // update positions
  player1.update();
  player2.update();
  // draw sprites
  drawSprites();
  
  // if player 1 is dead
  if (player1.isActive == false) {
    fill(255);
    textSize(16);
    text("Player 1 is Dead!", player1.x, player1.y);
  }

  // if player 2 is dead
  if (player2.isActive == false) {
    fill(255);
    textSize(16);
    text("Player 2 is Dead!", player2.x, player2.y);
  }
  
  // if both players dead
  if(player1.isActive == false && player2.isActive == false){
    gameState = 4;
  }
  
  
  // end of the game
  if(NUM_OF_DEAD_ENEMIES >= NUM_OF_ENEMIES){
    gameState = 5;
  }
  
}

function welcomeScreen() {
  textAlign(CENTER);
  background(0);
  fill(0, 255, 0);
  textSize(62);
  textFont(mabookFont);
  text(">WELCOME TO THE ORB<", width * 0.5, height * 0.2);
  fill(255);
  textSize(45);
  if (frameCount % 80 < 40) {
    text("Press Y To Begin Mission...", width * 0.5, height * 0.5);
  }
  for (let i = 0; i < 5; i++) {
    fill(random(100, 255), 200, random(100, 200));
    circle(random(width), random(height), 10);
  }
}

function storyScreen() {
  textAlign(LEFT);
  background(0);
  for (let i = 0; i < 5; i++) {
    fill(random(100, 255), 200, random(100, 200));
    circle(random(width), random(height), 10);
  }
  fill(0, 255, 0);
  textSize(62);
  textFont(mabookFont);
  text(">THE STORY<", width * 0.2, height * 0.2);
  textSize(18);
  fill(255);
  text(
    "YOUR MISSION IS TO CONTROL THE ORB, AN ARTIFICIALLY CREATED VIRUS",
    width * 0.1,
    height * 0.4
  );
  text(
    " DESIGNED TO WIPE OUT AN                               IN SPACE",
    width * 0.1,
    height * 0.45
  );
  fill(255, 0, 0);
  text("INVADING ALIEN RACE", width * 0.4, height * 0.45);
  fill(255);
  text(
    "THE ORB WILL START OUT SMALL BUT THE MORE ALIENS YOU CONSUME,\nTHE BIGGER YOU WILL GROW",
    width * 0.1,
    height * 0.55
  );
  fill(255, 0, 0);
  text(
    "BEWARE OF ALIENS THAT ARE LARGER THAN THE ORB,\nAS THEY CAN EASILY DESTROY YOU",
    width * 0.1,
    height * 0.65
  );
  fill(255);
  textSize(21);
  if (frameCount % 80 < 40) {
    text("PRESS Y TO BEGIN...", width * 0.1, height * 0.8);
  }
}

function howToPlayScreen() {
  textAlign(CENTER);
  background(0);
  for (let i = 0; i < 5; i++) {
    fill(random(100, 255), 200, random(100, 200));
    circle(random(width), random(height), 10);
  }
  fill(0, 255, 0);
  textSize(62);
  textFont(mabookFont);
  text(">HOW TO PLAY<", width * 0.5, height * 0.2);
  textSize(45);
  fill(255, 0, 255);
  text("> Player 1:  WASD KEY", width * 0.5, height * 0.4);
  fill(255, 255, 0);
  text("> Player 2:  ARROW KEYS", width * 0.5, height * 0.5);
  fill(255);
  textSize(32);
  if (frameCount % 80 < 40) {
    text("PRESS Y TO BEGIN...", width * 0.5, height * 0.8);
  }
}

function gameOverScreen(){
  textAlign(CENTER);
  textFont(mabookFont);
  background(0);
  fill(255, 255, 0);
  textSize(46);
  text("> Game Over <", width * 0.5, height * 0.5);
  fill(255);
  textSize(28);
  if (frameCount % 80 < 40) {
    text("PRESS Y TO RESTART...", width * 0.5, height * 0.8);
  }
}

function endGame(){
  textAlign(CENTER);
  textFont(mabookFont);
  background(0);
  fill(255, 255, 0);
  textSize(46);
  text("> You Win! <", width * 0.5, height * 0.5);
  fill(255);
  textSize(28);
  if (frameCount % 80 < 40) {
    text("PRESS Y TO RESTART...", width * 0.5, height * 0.8);
  }
}

function keyPressed() {
  if ((gameState == 0 && key == "y") || key == "Y") {
    gameState = 1;
  } else if ((gameState == 1 && key == "y") || key == "Y") {
    gameState = 2;
  } else if ((gameState == 2 && key == "y") || key == "Y") {
    gameState = 3;
  } else if(gameState == 4 && key == "y" || key == "Y"){
    // remove old sprites
    player_sprite1.remove();
    player_sprite2.remove();
    gameSetup();
    gameState = 3;
  } else if(gameState == 5 && key == "y" || key == "Y"){
    // remove old sprites
    player_sprite1.remove();
    player_sprite2.remove();
    gameSetup();
    gameState = 3;
  }
}
