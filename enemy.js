class Enemy{
  constructor(){
    // random positions
    this.x = random(width);
    this.y = random(height);
    // random size
    this.size = random(20, 30);
    // active at the begining
    this.isActive = true;
    // random enemy speed
    this.speedX = random(-4, 4);
    this.speedY = random(-4, 4);
    // random color
    this.color = color(random(100,255), random(100,255), random(100,255));
  }
  
  update(){
    // add speed to location
    this.x += this.speedX;
    this.y += this.speedY;
    
    // if hits the walls turn back
    if(this.x < 0|| this.x > width) {
        this.speedX *= -1;
    }

    // if hits the walls turn back
    if(this.y < 0|| this.y > height) {
        this.speedY *= -1;
    }
    
    // increase size of the enemy with a small amount
    this.size += 0.08;
  }
  
  display(){
    // display enemy
    fill(this.color);
    strokeWeight(3);
    circle(this.x, this.y, this.size);
  }
}

