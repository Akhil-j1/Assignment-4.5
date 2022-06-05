class Player {
  constructor(x_, y_, type_) {
    // Player location
    this.x = x_;
    this.y = y_;
    this.type = type_;
    this.isActive = true;
  }
  
  update() {
    // player 1
    if (this.type == 1 && this.isActive) {
      if (keyIsDown(68) || keyIsDown(100)) {
        this.x += 5;
		// flip horizontally
		player_sprite1.mirrorX(1);
		// move left
        player_sprite1.position.x = this.x;
      }
      if (keyIsDown(65) || keyIsDown(97)) {
        this.x -= 5;
		// flip horizontally
		player_sprite1.mirrorX(-1);
		// move left
        player_sprite1.position.x = this.x;
      }

      if (keyIsDown(87) || keyIsDown(119)) {
        this.y -= 5;
        player_sprite1.mirrorY(1);
        player_sprite1.rotation -= 1;
        // move up
        player_sprite1.position.y = this.y;
      }

      if (keyIsDown(83) || keyIsDown(115)) {
        this.y += 5;
        player_sprite1.mirrorY(-1);
        player_sprite1.rotation -= 1;
        // move down
        player_sprite1.position.y = this.y;
      }
    } 
    
    // player 2
    else if (this.type == 2 && this.isActive) {
      if (keyIsDown(RIGHT_ARROW)) {
        this.x += 5;
		// flip horizontally
		player_sprite2.mirrorX(1);
		// move left
        player_sprite2.position.x = this.x;
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= 5;
		// flip horizontally
		player_sprite2.mirrorX(-1);
		// move left
        player_sprite2.position.x = this.x;
      }

      if (keyIsDown(UP_ARROW)) {
        this.y -= 5;
        player_sprite2.mirrorY(1);
        player_sprite2.rotation -= 1;
        // move up
        player_sprite2.position.y = this.y;
      }

      if (keyIsDown(DOWN_ARROW)) {
        this.y += 5;
        player_sprite2.mirrorY(-1);
        player_sprite2.rotation -= 1;
        // move down
        player_sprite2.position.y = this.y;
      }
    }
    
    // keep player in the screen
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  
}
