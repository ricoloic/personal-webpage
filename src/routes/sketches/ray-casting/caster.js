import { Ray } from './ray';

export class Caster {
  constructor(p5, pos, rayColor, rayBgColor, rayThickness) {
    this.p5 = p5;
    this.pos = pos;
    this.radius = 10;
    this.rayColor = rayColor || this.p5.color(150);
    this.rayBgColor = rayBgColor || this.p5.color(220, 50);
    this.rayThickness = rayThickness || 1;
  }

  cast(boundaries) {
    const rays = this.#makeRays(boundaries);
    const foundIntersections = [];
    for (let i = 0; i < rays.length; i += 1) {
      let closest = null;
      let min = Infinity;

      for (let j = 0; j < boundaries.length; j += 1) {
        const intersection = rays[i].cast(boundaries[j]);

        if (intersection) {
          const distance = this.pos.dist(intersection);
          if (distance < min) {
            min = distance;
            closest = intersection;
          }
        }
      }

      if (closest) {
        foundIntersections.push([closest, rays[i].angle]);
      }
    }

    this.p5.noStroke();
    this.p5.fill(this.rayBgColor);
    foundIntersections.sort((a, b) => a[1] - b[1]);
    this.p5.beginShape();
    foundIntersections.forEach(([{ x, y }]) => this.p5.vertex(x, y));
    this.p5.endShape();

    this.p5.strokeWeight(this.rayThickness);
    this.p5.stroke(this.rayColor);
    foundIntersections.forEach(([{ x, y }]) => this.p5.line(this.pos.x, this.pos.y, x, y));
  }

  setPos(x, y) {
    this.pos.set(x, y);
  }

  #makeRays(boundaries) {
    const rays = [];

    for (let i = 0; i < boundaries.length; i += 1) {
      const b = boundaries[i];
      const p = this.pos;

      const a1 = this.#getAngle(b.pt1, p);
      const a11 = a1 + 0.001;
      const a12 = a1 - 0.001;

      const a2 = this.#getAngle(b.pt2, p);
      const a21 = a2 + 0.001;
      const a22 = a2 - 0.001;

      const angles = [a1, a12, a11, a2, a21, a22];
      angles.forEach((a) => rays.push(new Ray(this.p5, this.pos, a)));
    }
    return rays;
  }

  #getAngle(pt1, pt2) {
    return this.p5.constructor.Vector.sub(pt1, pt2).normalize().heading();
  }
}

export default Caster;
