export class LineBoundary {
  constructor(p5, pt1, pt2) {
    this.p5 = p5;
    this.pt1 = pt1;
    this.pt2 = pt2;
  }

  show({
    editing = false,
    color = this.p5.color(255),
    thickness = 2,
  }) {
    this.p5.strokeWeight(thickness);
    this.p5.stroke(color);
    this.p5.line(this.pt1.x, this.pt1.y, this.pt2.x, this.pt2.y);

    if (editing) {
      this.pt1.show();
      this.pt2.show();
    }
  }

  get lines() {
    return [this];
  }

  get points() {
    return [this.pt1, this.pt2];
  }
}

export default LineBoundary;
