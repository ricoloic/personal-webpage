import P5 from 'p5';

export class Point extends P5.Vector {
  constructor(p5, x, y) {
    super(x, y);

    this.p5 = p5;
    this.moving = false;
  }

  show() {
    if (this.hovering) this.p5.fill(100, 20, 20);
    else this.p5.fill(200, 40, 40);

    this.p5.strokeWeight(1);
    this.p5.ellipse(this.x, this.y, 30, 30);

    if (this.moving) {
      this.set(this.p5.mouseX, this.p5.mouseY);
    }
  }

  get hovering() {
    return this.p5.dist(this.x, this.y, this.p5.mouseX, this.p5.mouseY) < 15;
  }
}

export default Point;
