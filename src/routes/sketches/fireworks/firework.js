import { Particle } from './particle';
import { Spark } from './spark';

export class Firework extends Particle {
  constructor(p, position, sparkAmount) {
    super(p, position);
    this.acceleration = p.createVector(0, 0.05);
    this.sparkAmount = sparkAmount;
    this.sparks = [];
  }

  applyForce(force) {
    if (this.exploded) this.sparks.forEach((s) => s.applyForce(force.copy().mult(0.25)));
    else super.applyForce(force);
  }

  isGoingDown() {
    return this.velocity.y > 2.5;
  }

  update() {
    if (this.exploded) {
      this.sparks.forEach((spark) => {
        spark.update();
      });
    } else {
      super.update();
    }
  }

  explode() {
    for (let i = 0; i < this.sparkAmount; i++) {
      const spark = new Spark(this.p5, this.position.copy());
      const randomDirection = this
        .p5
        .constructor
        .Vector
        .random2D()
        .setMag(this.p5.random(-1, 1));
      spark.applyForce(randomDirection);
      this.sparks.push(spark);
    }
  }

  show() {
    if (this.exploded) {
      this.sparks.forEach((spark) => {
        spark.show();
      });
    } else {
      this.p5.stroke(255);
      this.p5.strokeWeight(10);
      this.p5.point(this.position.x, this.position.y);
    }
  }

  get exploded() {
    return this.sparks.length > 0;
  }

  get finished() {
    return this.exploded && this.sparks.every((s) => s.finished);
  }
}

export default Firework;
