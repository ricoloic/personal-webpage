import React, { useEffect } from 'react';
import P5 from 'p5';
import Layout from '../../../Layout';
import { Asteroid } from './asteroid';
import { Spaceship } from './spaceship';

// instantiate an asteroid array
let asteroids = [];
let spaceship = null;

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.P2D).parent('parent');

    spaceship = new Spaceship(p, p.createVector(p.width / 2, p.height / 2), 10);

    for (let i = 0; i < 5; i++) {
      const incrementOffset = p.random(1, 60) * i;
      const randomMinRadius = p.random(50, 100);
      const randomMaxRadius = p.random(randomMinRadius + 20, randomMinRadius + p.random(50, 100));
      const x = p.random(randomMaxRadius, p.width - randomMaxRadius);
      const y = p.random(randomMaxRadius, p.height - randomMaxRadius);
      const randomPosition = p.createVector(x, y);
      const asteroid = new Asteroid(
        p,
        randomPosition,
        randomMinRadius,
        randomMaxRadius,
        incrementOffset,
      );
      asteroids.push(asteroid);
    }
  };

  p.draw = () => {
    p.background(255);

    const mouseVector = p.createVector(p.mouseX, p.mouseY);

    const distanceMouseToSpaceship = p.constructor.Vector.dist(mouseVector, spaceship.position);
    if (distanceMouseToSpaceship > 10) {
      spaceship.applyForce(p.constructor.Vector.sub(mouseVector, spaceship.position));
    }
    spaceship.update();
    spaceship.show();

    spaceship.projectiles.forEach((projectile, index) => {
      projectile.update();
      projectile.show();

      const destroyedAsteroid = projectile.hits(asteroids);

      if (projectile.isOffScreen() || destroyedAsteroid) {
        spaceship.projectiles.splice(index, 1);
      }

      if (destroyedAsteroid) {
        const asteroidParticles = destroyedAsteroid.explode();
        asteroids.splice(asteroids.indexOf(destroyedAsteroid), 1);
        asteroids = asteroids.concat(asteroidParticles);
      }
    });

    asteroids.forEach((asteroid) => {
      // asteroid.show();
      asteroid.showAvgCircle();
      asteroid.checkEdges();
      // asteroid.applyForce(p.constructor.Vector.sub(spaceship.position, asteroid.pos));
      asteroid.update();
    });
  };

  p.mousePressed = () => {
    spaceship.fireProjectile();
  };

  p.keyPressed = () => {
  };
});

const AsteroidGame = function () {
  const [sketch, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => {
      sketch.remove();
      asteroids = [];
      spaceship = null;
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    asteroids = [];
    spaceship = null;
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Layout handleRefresh={handleRefresh}>
      <div className="sketch-container" id="parent" />
    </Layout>
  );
};

export default AsteroidGame;
