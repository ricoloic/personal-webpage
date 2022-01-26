export class Ray {
  constructor(p5, origin, angle) {
    this.p5 = p5;
    this.origin = origin;
    this.angle = angle;
    this.direction = this.p5.constructor.Vector.fromAngle(angle);
  }

  cast(boundary) {
    const { pt1, pt2 } = boundary;
    const { x: x1, y: y1 } = pt1;
    const { x: x2, y: y2 } = pt2;
    const { x: x3, y: y3 } = this.origin;
    const { x: x4, y: y4 } = this.direction;

    const t = Ray.#calculateT(
      { x1, y1 },
      { x2, y2 },
      { x3, y3 },
      { x4: x4 + x3, y4: y4 + y3 },
    );
    const u = Ray.#calculateU(
      { x1, y1 },
      { x2, y2 },
      { x3, y3 },
      { x4: x4 + x3, y4: y4 + y3 },
    );

    const intersectBoundary = t > 0 && t < 1 && u > 0;

    if (intersectBoundary) {
      const intersectionPoint = Ray.#calculateIntersection(
        { x1, y1 },
        { x2, y2 },
        t,
      );

      return this.p5.createVector(intersectionPoint.x, intersectionPoint.y);
    }

    return null;
  }

  static #calculateIntersection({ x1, y1 }, { x2, y2 }, t) {
    const x = x1 + t * (x2 - x1);
    const y = y1 + t * (y2 - y1);
    return { x, y };
  }

  static #calculateU({ x1, y1 }, { x2, y2 }, { x3, y3 }, { x4, y4 }) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return -1;
    }
    const numerator = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);
    return numerator / denominator;
  }

  static #calculateT({ x1, y1 }, { x2, y2 }, { x3, y3 }, { x4, y4 }) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return -1;
    }
    const numerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    return (numerator / denominator);
  }
}

export default Ray;
