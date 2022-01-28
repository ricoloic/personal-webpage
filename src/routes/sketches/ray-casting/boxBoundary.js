import { LineBoundary } from './lineBoundary';

export class BoxBoundary {
  constructor(p5, pt1, pt2, pt3, pt4, color, thickness) {
    this.p5 = p5;
    this.pt1 = new LineBoundary(p5, pt1, pt2);
    this.pt2 = new LineBoundary(p5, pt2, pt3);
    this.pt3 = new LineBoundary(p5, pt3, pt4);
    this.pt4 = new LineBoundary(p5, pt4, pt1);
    this.color = color === undefined ? this.p5.color(255) : color;
    this.thickness = thickness === undefined ? 2 : thickness;
  }

  show({ editing } = { editing: false }) {
    const params = {
      editing,
      color: this.color,
      thickness: this.thickness,
    };
    this.pt1.show(params);
    this.pt2.show(params);
    this.pt3.show(params);
    this.pt4.show(params);
  }

  get lines() {
    return [
      this.pt1,
      this.pt2,
      this.pt3,
      this.pt4,
    ];
  }

  get points() {
    return [
      this.pt1.pt1,
      this.pt1.pt2,
      this.pt2.pt1,
      this.pt2.pt2,
      this.pt3.pt1,
      this.pt3.pt2,
      this.pt4.pt1,
      this.pt4.pt2,
    ];
  }
}

export default BoxBoundary;
