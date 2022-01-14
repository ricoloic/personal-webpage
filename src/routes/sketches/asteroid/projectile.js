export class Projectile {
  constructor(p5, initialPosition, initialVelocity, projectileSize) {
    this.p5 = p5;
    this.position = initialPosition;
    this.velocity = initialVelocity.setMag(2.5);
    this.projectileSize = projectileSize;
  }

  update() {
    this.position.add(this.velocity);
  }

  show() {
    this.p5.stroke(0);
    this.p5.strokeWeight(this.projectileSize);
    this.p5.point(this.position.x, this.position.y);
  }

  hits(asteroids) {
    for (let i = 0; i < asteroids.length; i++) {
      const asteroid = asteroids[i];

      const distanceProjectileAsteroid = this.p5.constructor.Vector.dist(
        asteroid.position,
        this.position,
      );

      if (distanceProjectileAsteroid <= asteroid.avgRadius) {
        return asteroid;
      }
    }
    return false;
  }

  isOffScreen() {
    return (
      this.position.x > this.p5.width
      || this.position.x < 0
      || this.position.y > this.p5.height
      || this.position.y < 0
    );
  }
}

export default Projectile;
