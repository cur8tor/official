class badTank {
  constructor(x, y, hp, s) {
    this.x = x;
    this.y = y;
    this.targetAngle = 0;
    this.tx = random(0, 10000);
    this.ty = random(0, 10000);
    this.health = hp;
    this.speed = s;
  }

  show() {
    push();
    translate(windowWidth / 2, windowHeight / 2);
    angle3 = atan2(-(this.y - tank1.pos.y), -(this.x - tank1.pos.x));
    let dirt = (angle3 - targetAngle3) / TWO_PI;
    dirt -= round(dirt);
    dirt *= TWO_PI;
    targetAngle3 += dirt;
    this.target = targetAngle3;
    pop();

    push();
    translate(windowWidth / 2, windowHeight / 2);
    noStroke();
    fill(255);
    rectMode(CENTER);
    //rect(this.x, this.y, 55, 50, 6);
    fill(0);
    rectMode(CENTER);
    stroke(255);
    strokeWeight(1);
    noStroke();
    rect(this.x, this.y, 40, 25, 3); //body
    noStroke();
    fill(0);
    rect(this.x, this.y + 18, 50, 7, 10); //rtrack
    fill(220, 30, 30);
    rect(this.x, this.y + 18, this.health * 10, 7, 10); //healthbar
    fill(240);
    fill(0);
    noStroke();
    rect(this.x, this.y - 18, 50, 7, 10); //rtrack
    fill(220, 30, 30);
    rect(this.x, this.y - 18, this.health * 10, 7, 10); //healthbar
    fill(140);
    translate(this.x, this.y);
    rotate(targetAngle3);
    stroke(255);
    fill(255);
    rect(14, 0, 30, 4); //cannon
    rect(26, 0, 6, 10); //cannon
    rect(0, 0, 10, 8); //cannon
    pop();
  }

  update() {
    this.x = map(noise(this.tx), 0, 1, -windowWidth + 120, windowWidth - 120);
    this.y = map(noise(this.ty), 0, 1, -windowHeight + 120, windowHeight - 120);

    this.tx += this.speed;
    this.ty += this.speed;
  }

}