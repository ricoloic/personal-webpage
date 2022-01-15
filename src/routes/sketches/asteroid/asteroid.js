import { Blob } from './blob';

export class Asteroid extends Blob {
  constructor(
    p5,
    position,
    minRadius,
    maxRadius,
    initialVelocity = p5.constructor.Vector.random2D(),
  ) {
    super(p5, position, minRadius, maxRadius);

    this.maxSpeed = 0.1;
    this.vel = initialVelocity;
    this.acc = p5.createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force).setMag(this.maxSpeed);
  }

  update() {
    this.vel.add(this.acc);
    this.position.add(this.vel);
    this.vel.limit(1);
  }

  explode() {
    // if the asteroid is big enough, split it into smaller asteroids
    // with random velocities
    // and at the same position of the current asteroid

    if (this.radius < 20) return [];

    const newAsteroids = [];
    for (let i = 0; i < 2; i++) {
      const newAsteroid = new Asteroid(
        this.p5,
        this.position.copy(),
        this.minRadius / 2,
        this.maxRadius / 2,
        this.p5.constructor.Vector.random2D(),
      );
      newAsteroids.push(newAsteroid);
    }
    return newAsteroids;
  }
}

export default Asteroid;
