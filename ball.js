class ball {
  constructor(x, y, w, h, a) {
    this.pos = createVector(x, y);
    this.vel = createVector(cos(a), sin(a));
    this.acc = createVector(1, 1);
    this.w = 5;
    this.h = h;
    this.toDelete = false;
    this.bSped = 10;
  }

  show() {
    let oops = this.vel.heading();
    fill(0);
    push();
    rectMode(CENTER);
    translate(windowWidth / 2, windowHeight / 2);
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.w * 3);
    pop();
  }

  hits(badTank) {
    let d = dist(this.pos.x, this.pos.y, badTank.x, badTank.y);
    if (d < this.w+20) {
      return true;
    } else {
      return false;
    }
  }

  bumps(jug) {
    let v = dist(this.pos.x, this.pos.y, jug.x * 3, jug.y * 3);
    if (v < 90) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    this.vel.normalize();
    this.vel.mult(this.bSped);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}