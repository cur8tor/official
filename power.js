class power {

  constructor(x, y, w, h, thp) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.usage = thp;
    this.current = thp;
    this.L = 0;
    //this.perc = this.current/this.usage;
  }

  show() {
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.w, this.h, 10);
    fill(255);
    noStroke();
    let L = map(this.current, 0, this.usage, 0, this.w);
    this.L = L;
    rect(this.pos.x, this.pos.y, this.w - 1, this.current * 3, this.current / 4);
    textSize(18);
    this.perc = floor(this.current / this.usage * 100);
    text(this.perc, this.pos.x, this.pos.y - 25);
  }
}