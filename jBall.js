class jBall {
  constructor(x, y, w, h, lol1) {
    this.pos = createVector(x, y);
    this.vel = createVector(cos(lol1), sin(lol1));
    this.acc = createVector(1, 1);
    this.w = w;
    this.h = h;
  }

  show() {

    fill(0);
    push();
    rectMode(CENTER);
    translate(windowWidth / 2, windowHeight / 2);
    noStroke();
    fill(220, 30, 30);
    ellipse(this.pos.x, this.pos.y, this.w * 3);
    //fill(255);
    //ellipse(this.pos.x, this.pos.y, this.w);
    pop();
  }

  hits(tank1) {
    let d = dist(this.pos.x, this.pos.y, tank1.pos.x, tank1.pos.y);
    if (d < 30) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    this.vel.normalize();
    this.vel.mult(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}