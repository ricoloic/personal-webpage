import React, { useEffect } from 'react';
import P5 from 'p5';
import Index from '../../../components/layout';
import { AsteroidGameObject } from './asteroidGameObject';

let game = null;

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.P2D).parent('parent');

    game = new AsteroidGameObject(p);
    game.setup();
  };

  p.draw = () => {
    p.background(255);
    game.run();

    if (p.keyIsPressed && p.keyCode === 38) {
      game.spaceship.accelerate();
    }
  };

  p.keyReleased = () => {
    game.spaceship.rotation = 0;
  };

  p.keyPressed = () => {
    if (p.keyCode === 32) {
      game.spaceship.fireProjectile();
    }

    if (p.keyCode === 37) {
      game.spaceship.rotation = -0.1;
    } else if (p.keyCode === 39) {
      game.spaceship.rotation = 0.1;
    }
  };
});

const AsteroidGame = function () {
  const [sketch, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => {
      newSketch.remove();
      game = null;
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    game = null;
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Index handleRefresh={handleRefresh}>
      <div className="sketch-container" id="parent" />
    </Index>
  );
};

export default AsteroidGame;
