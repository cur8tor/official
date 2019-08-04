class jug {
  constructor(x, y, hp, s) {
    this.x = x;
    this.y = y;
    this.targetAngle = 0;
    this.tx = 0;
    this.ty = 1000;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.real = map(this.health, 0, this.maxHealth, 0, 100);
    this.speed = s;
    this.alive = true;
  }

  show() {

    push();
    translate(windowWidth / 2, windowHeight / 2);
    angle3 = atan2(-(this.y * 3 - tank1.pos.y), -(this.x * 3 - tank1.pos.x));
    let dirt = (angle3 - targetAngle3) / TWO_PI;
    dirt -= round(dirt);
    dirt *= TWO_PI;
    targetAngle3 += dirt;
    this.target = targetAngle3;
    pop();

    this.real = map(this.health, 0, this.maxHealth, 0, 100);
    this.him = map(this.health, 0, this.maxHealth, 0, 255);
    this.bop = map(this.health, 0, this.maxHealth, 15, 1);

    strokeWeight(1);
    push();
    translate(windowWidth / 2, windowHeight / 2);
    scale(3);
    noStroke();
    fill(255);
    rectMode(CENTER);
    //rect(this.x, this.y, 55, 50, 6);
    fill(255, this.him, this.him);
    fill(0);
    rectMode(CENTER);
    //stroke(255);
    rect(this.x, this.y, 40, 25, 3); //body   
    noStroke();
    fill(0);
    rect(this.x, this.y + 18, 50, 7, 10); //rtrack
    fill(255);
    rect(800, 800, 300, 30, 10); //healthbar
    fill(240);
    fill(0);
    noStroke();
    rect(this.x, this.y - 18, 50, 7, 10); //rtrack
    fill(170, 0, 0);
    fill(140);
    translate(this.x, this.y);
    rotate(targetAngle3);
    stroke(255);
    fill(255, this.him, this.him);
    rect(14, 0, 30, 4); //cannon
    rect(26, 0, 6, 10); //cannon
    rect(0, 0, 10, 8); //cannon
    pop();
    fill(140);
    rect(windowWidth / 2, 90, this.real * 6 + 8, 30, 10);
    fill(220, 30, 30);
    rect(windowWidth / 2, 90, this.real * 6, 30, 10);
    fill(0);
    textSize(30);
    text(floor(this.real), windowWidth / 2, 100);
  }

  update() {
    this.x = map(noise(this.tx), 0, 1, -150, 150);
    this.y = map(noise(this.ty), 0, 1, -100, 100);

    this.tx += this.speed;
    this.ty += this.speed;
  }

}