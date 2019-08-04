class tank {
  constructor(x, y, m, c) {
    this.pos = createVector(x, y);
    this.alive = true;
    this.maxHealth = m;
    this.health = this.maxHealth;
    this.real = map(this.health, 0, this.maxHealth, 0, 100);
    this.class = c;
  }

  show() {

    push();
    translate(windowWidth / 2, windowHeight / 2);
    angle = atan2(mouseY - windowHeight / 2 - tank1.pos.y, mouseX - windowWidth / 2 - tank1.pos.x);
    let dir = (angle - targetAngle) / TWO_PI;
    dir -= round(dir);
    dir *= TWO_PI;
    targetAngle += dir;
    pop();

    this.real = map(this.health, 0, this.maxHealth, 0, 100);

    push();
    translate(windowWidth / 2, windowHeight / 2);
    stroke(255);
    strokeWeight(1);
    ellipseMode(CENTER);
    fill(0);
    rectMode(CENTER);
    noStroke();
    if (this.class === 1) {
      ellipse(this.pos.x, this.pos.y, 40, 40); //body
      translate(this.pos.x, this.pos.y);
      rotate(targetAngle);
      fill(0);
      rect(14, 0, 30, 4); //cannon
      fill(255, 255, 0);
      rect(30, 0, 6, 10); //cannon
      rect(0, 0, 10, 8); //cannon
      fill(255, 255, 0);
      ellipse(0, 0, 15, 15);
    } else if (this.class === 2) {
      ellipse(this.pos.x, this.pos.y, 40, 40);
      translate(this.pos.x, this.pos.y);
      rotate(targetAngle - 1.5);
      rect(5, 20, 5, -40);
      rect(-5, 20, 5, -40);
      fill(124, 197, 249);
      rect(0, 20, 5, -40);
      fill(0, 255, 255);
      ellipse(0, 0, 20);
      rect(0, 45, 20, 10, 1);
    } else if (this.class === 3) {
      fill(0);

      translate(this.pos.x, this.pos.y);
      //ellipse(this.x, this.y, 40);
      rotate(targetAngle + 1.5);
      push();
      //translate(70,100);
      rotate(-0);
      rotate(-0.3);
      rect(0, -20, 5, 30);
      fill(255, 0, 0);
      rect(0, -35, 10, 10);
      rotate(0.3);
      fill(0);
      rect(0, -20, 5, 30);
      fill(255, 0, 0);
      rect(0, -35, 10, 10);
      rotate(0.3);
      fill(0);
      rect(0, -20, 5, 30);
      fill(255, 0, 0);
      rect(0, -35, 10, 10);
      rotate(0.3);
      fill(0);
      rect(0, -20, 5, 30);
      fill(255, 0, 0);
      rect(0, -35, 10, 10);
      fill(0);
      ellipse(0, 0, 40);
      fill(255, 0, 0);
      ellipse(0, 0, 20);
      pop();
      fill(255, 0, 0);

    }

    strokeWeight(1);
    pop();
    textSize(18);
    textAlign(CENTER);
    textStyle(ITALIC);
    textStyle(BOLD);
    if (toot != 0) {
    fill(0);
    rect(windowWidth / 2, windowHeight - 60, 513, 23, 20);
    fill(0, 200, 15);
    fill(255);
    rect(windowWidth / 2, windowHeight - 60, this.real * 5, 15, 20);
    fill(0);
    text(floor(this.real), windowWidth / 2, windowHeight - 54);
  }
  }
}