export class Particle {
  constructor(p, position) {
    this.p5 = p;
    this.position = position;
    this.velocity = this.p5.createVector(0, 0);
    this.acceleration = this.p5.createVector(0, 0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}

export default Particle;
