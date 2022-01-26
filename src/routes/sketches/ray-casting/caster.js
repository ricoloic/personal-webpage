import { Ray } from './ray';

export class Caster {
  constructor(p5, pos) {
    this.p5 = p5;
    this.pos = pos;
    this.radius = 2;

    this.rays = new Array(360);
    for (let angle = 0; angle < 360; angle += 1) {
      this.rays[angle] = new Ray(this.p5, this.pos, this.p5.radians(angle));
    }
  }

  cast(boundaries) {
    for (let i = 0; i < this.rays.length; i += 1) {
      let closest = null;
      let min = Infinity;

      for (let j = 0; j < boundaries.length; j += 1) {
        const intersection = this.rays[i].cast(boundaries[j]);

        if (intersection) {
          const distance = this.pos.dist(intersection);
          if (distance < min) {
            min = distance;
            closest = intersection;
          }
        }
      }

      if (closest) {
        this.p5.strokeWeight(12);
        this.p5.stroke(255);
        // this.p5.circle(intersection.x, intersection.y, this.radius * 2);
        this.p5.line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  setPos(x, y) {
    this.pos.set(x, y);
  }

  show() {
    // this.p5.fill(255);
    // this.p5.circle(this.pos.x, this.pos.y, this.radius * 2);
    // this.rays.forEach((ray) => {
    //   ray.show();
    // });
  }
}

export default Caster;
