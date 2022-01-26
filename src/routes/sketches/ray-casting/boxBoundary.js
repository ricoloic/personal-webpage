import { LineBoundary } from './lineBoundary';

export class BoxBoundary {
  constructor(p5, pt1, pt2, pt3, pt4) {
    this.p5 = p5;
    this.pt1 = new LineBoundary(p5, pt1, pt2);
    this.pt2 = new LineBoundary(p5, pt2, pt3);
    this.pt3 = new LineBoundary(p5, pt3, pt4);
    this.pt4 = new LineBoundary(p5, pt4, pt1);
  }

  show() {
    this.pt1.show();
    this.pt2.show();
    this.pt3.show();
    this.pt4.show();
  }

  get lines() {
    return [
      this.pt1,
      this.pt2,
      this.pt3,
      this.pt4,
    ];
  }
}

export default BoxBoundary;
