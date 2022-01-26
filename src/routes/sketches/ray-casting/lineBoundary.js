export class LineBoundary {
  constructor(p5, pt1, pt2) {
    this.p5 = p5;
    this.pt1 = pt1;
    this.pt2 = pt2;
  }

  show() {
    this.p5.strokeWeight(2);
    this.p5.stroke(255, 0, 0);
    this.p5.line(this.pt1.x, this.pt1.y, this.pt2.x, this.pt2.y);
  }

  get lines() {
    return [this];
  }
}

export default LineBoundary;
