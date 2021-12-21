export class Bubble {
  constructor(p, x, y, r, moveS = 1) {
    this.p5 = p;
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = p.random(-moveS, moveS);
    this.sx = this.s;
    this.sy = this.s;
    this.colr = p.random(50, 255);
    this.colg = p.random(50, 255);
    this.colb = p.random(50, 255);
    this.alfa = 0;
  }

  onBubble(mx, my) {
    return this.p5.dist(this.x, this.y, mx, my) <= this.r;
  }

  color(alfa) {
    this.alfa = alfa;
  }

  intersect(other) {
    const d = this.p5.dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
  }

  circle() {
    this.p5.fill(this.colr, this.colg, this.colb, this.alfa);
    this.p5.stroke(255);
    this.p5.strokeWeight(2);
    this.p5.ellipse(this.x, this.y, this.r * 2);
  }

  rect() {
    this.p5.fill(this.colr, this.colg, this.colb, this.alfa);
    this.p5.stroke(255);
    this.p5.strokeWeight(2);
    this.p5.rectMode(this.p5.CENTER);
    this.p5.rect(this.x, this.y, this.r * 2, this.r * 2);
  }

  move() {
    this.x += this.sx;
    this.y += this.sy;

    if (this.x <= this.r || this.x >= this.p5.width - this.r) {
      this.sx *= -1;
    }

    if (this.y <= this.r || this.y >= this.p5.height - this.r) {
      this.sy *= -1;
    }
  }
}

export default Bubble;
