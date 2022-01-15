import { Projectile } from './projectile';
import { Mover } from './mover';

export class Spaceship extends Mover {
  constructor(p5, initialPosition, size = 5) {
    super(p5, initialPosition);

    this.velocity = p5.createVector(0, 0);
    this.heading = 0;
    this.rotation = 0;

    this.size = size;

    this.projectiles = [];
  }

  turn() {
    this.heading += this.rotation;
  }

  accelerate() {
    const force = this.p5.constructor.Vector.fromAngle(this.heading);
    this.velocity.add(force).limit(2);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(0.98);
  }

  fireProjectile() {
    const projectile = new Projectile(
      this.p5,
      this.position.copy(),
      this.p5.constructor.Vector.fromAngle(this.heading).setMag(6),
      this.size / 2,
    );
    this.projectiles.push(projectile);
  }

  // display the spaceship
  show() {
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(this.heading);
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.fill(0);
    this.p5.triangle(0, 0, -this.size * 2, +this.size, -this.size * 2, -this.size);
    this.p5.pop();
  }
}

export default Spaceship;
