import { Particle } from './particle';

export class Spark extends Particle {
  constructor(p, position, color) {
    super(p, position);
    this.color = color || {
      r: this.p5.random(20, 255),
      g: this.p5.random(20, 255),
      b: this.p5.random(20, 255),
    };
    this.lifetime = 255;
  }

  update() {
    super.update();
    this.lifetime -= 4;
  }

  show() {
    this.p5.stroke(this.color.r, this.color.g, this.color.b, this.lifetime);
    this.p5.strokeWeight(5);
    this.p5.point(this.position.x, this.position.y);
  }

  get finished() {
    return this.lifetime < 0;
  }
}

export default Spark;
