import { Point } from './point';
import { LineBoundary } from './lineBoundary';

export class Boundary {
  constructor(p5, pointAmount, color, thickness) {
    this.p5 = p5;
    this.pointAmount = pointAmount || 2;
    this.color = color === undefined ? this.p5.color(255) : color;
    this.thickness = thickness === undefined ? 2 : thickness;

    this.points = [];
    this.lines = [];

    const smallest = p5.min(p5.width, p5.height);
    const radius = smallest / 3;
    const center = { x: p5.width / 2, y: p5.height / 2 };
    for (let i = 0; i < this.pointAmount; ++i) {
      const m = p5.map(i, 0, this.pointAmount, 0, p5.TWO_PI);
      const x = p5.cos(m) * radius + center.x;
      const y = p5.sin(m) * radius + center.y;
      this.points.push(new Point(p5, x, y));
    }

    for (let i = 0; i < this.pointAmount; ++i) {
      const p1 = this.points[i];
      const p2 = this.points[(i + 1) % this.pointAmount];
      this.lines.push(
        new LineBoundary(p5, p1, p2, this.color, this.thickness),
      );
    }
  }

  show({ editing } = { editing: false }) {
    const params = {
      editing,
      color: this.color,
      thickness: this.thickness,
    };
    this.lines.forEach((line) => line.show(params));
  }
}

export default Point;
