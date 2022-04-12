import { Particle } from './particle';
import { Spark } from './spark';

export class Firework extends Particle {
  constructor(p, position, sparkAmount, sparksColor) {
    super(p, position);
    this.acceleration = p.createVector(0, 0.05);
    this.sparkAmount = sparkAmount;
    this.sparks = [];
    this.sparksColor = sparksColor;
    this.previousPosition = this.position.copy();
  }

  applyForce(force) {
    if (this.exploded) this.sparks.forEach((s) => s.applyForce(force));
    else super.applyForce(force);
  }

  isGoingDown() {
    return this.velocity.y > 2.5;
  }

  update() {
    if (this.exploded) this.sparks.forEach((spark) => spark.update());
    else {
      this.previousPosition = this.p5.constructor.Vector.sub(this.position, this.velocity);
      super.update();
    }
  }

  explode() {
    for (let i = 0; i < this.sparkAmount; i++) {
      const spark = new Spark(this.p5, this.position.copy(), this.sparksColor);
      const randomDirection = this
        .p5
        .constructor
        .Vector
        .random2D()
        .setMag(this.p5.random(-5, 5));
      spark.applyForce(randomDirection);
      this.sparks.push(spark);
    }
  }

  reset() {
    this.position.set(this.p5.random(0, this.p5.width), this.p5.random(this.p5.height + 1, this.p5.height + 6));
    this.previousPosition.set(this.position.x, this.position.y);
    this.velocity.set(0, 0);
    this.acceleration.set(0, 0);
    this.sparks = [];
    this.applyForce(this.p5.createVector(0, this.p5.random(-10, -12)));
  }

  show() {
    if (this.exploded) {
      this.sparks.forEach((spark) => spark.show());
    } else {
      this.p5.stroke(255);
      this.p5.strokeWeight(7);
      this.p5.point(this.position.x, this.position.y);
      this.p5.line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y);
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
