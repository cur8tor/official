class badBall {
  constructor(x, y, w, h, lol1) {
    this.pos = createVector(x, y);
    this.vel = createVector(cos(lol1), sin(lol1));
    this.acc = createVector(1, 1);
    this.w = w;
    this.h = h;
  }

  show() {

    fill(255);
    push();
    rectMode(CENTER);
    translate(windowWidth / 2, windowHeight / 2);
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.w * 3);
    pop();
  }

  hits(tank) {
    let d = dist(this.pos.x, this.pos.y, tank1.pos.x, tank1.pos.y);
    if (d < 40) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    this.vel.normalize();
    this.vel.mult(7);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}