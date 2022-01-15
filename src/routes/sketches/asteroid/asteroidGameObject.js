import { Spaceship } from './spaceship';
import { Asteroid } from './asteroid';

const sides = (width, height) => [
  // top
  { x: [0, width], y: [0, 0] },
  // right
  { x: [width, width], y: [0, height] },
  // bottom
  { x: [0, width], y: [height, height] },
  // left
  { x: [0, 0], y: [0, height] },
];

export class AsteroidGameObject {
  constructor(p5) {
    this.p5 = p5;
    this.asteroids = [];
    this.asteroidCount = 10;
    this.spaceship = null;
  }

  setup() {
    const centerPosition = this.p5.createVector(
      this.p5.width / 2,
      this.p5.height / 2,
    );

    this.spaceship = new Spaceship(this.p5, centerPosition, 10);

    for (let i = 0; i < this.asteroidCount; i++) {
      const side = this.p5.random(sides(this.p5.width, this.p5.height));
      const asteroidPosition = this.p5.createVector(
        this.p5.random(side.x[0], side.x[1]),
        this.p5.random(side.y[0], side.y[1]),
      );

      this.asteroids.push(new Asteroid(this.p5, asteroidPosition, 50, 75));
    }
  }

  run() {
    this.spaceship.checkEdges();
    this.spaceship.show();
    this.spaceship.turn();
    this.spaceship.update();

    this.spaceship.projectiles.forEach((projectile, index) => {
      projectile.update();
      projectile.show();

      const destroyedAsteroid = projectile.hits(this.asteroids);

      if (projectile.isOffScreen() || destroyedAsteroid) {
        this.spaceship.projectiles.splice(index, 1);
      }

      if (destroyedAsteroid) {
        const asteroidParticles = destroyedAsteroid.explode();
        this.asteroids.splice(this.asteroids.indexOf(destroyedAsteroid), 1);
        asteroidParticles.forEach((asteroid) => this.asteroids.push(asteroid));
      }
    });

    this.asteroids.forEach((asteroid) => {
      asteroid.show();
      asteroid.checkEdges();
      asteroid.update();
    });
  }
}

export default AsteroidGameObject;
