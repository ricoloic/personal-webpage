import { Projectile } from './projectile';

export class Spaceship {
  constructor(p5, initialPosition, size = 5) {
    this.p5 = p5;
    this.position = initialPosition;
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, 0);
    this.size = size;
    this.maxSpeed = 1.5;
    this.projectiles = [];
  }

  applyForce(force) {
    this.acceleration.add(force.limit(0.4));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.9);
  }

  fireProjectile() {
    const projectile = new Projectile(
      this.p5,
      this.position.copy(),
      this.velocity.copy(),
      this.size / 2,
    );
    this.projectiles.push(projectile);
  }

  // display the spaceship
  show() {
    this.p5.push();
    const rotation = this.velocity.heading();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(rotation);
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.fill(0);
    this.p5.triangle(0, 0, -this.size * 2, +this.size, -this.size * 2, -this.size);
    this.p5.pop();
  }
}

export default Spaceship;
