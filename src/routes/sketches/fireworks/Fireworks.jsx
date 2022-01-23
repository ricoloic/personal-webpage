import React from 'react';
import P5 from 'p5';
import Layout from '../../../components/layout';
import { Firework } from './firework';

const fireworkAmount = 5;
let fireworks = [];
let gravity = null;
const sparkAmount = 40;

const makeSketch = () => new P5((p) => {
  const getRandomVector = () => p.createVector(0, p.random(-10, -12));
  const createFirework = () => {
    const position = p.createVector(p.random(0, p.width), p.height);
    const firework = new Firework(p, position, sparkAmount);
    firework.applyForce(getRandomVector());
    return firework;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    gravity = p.createVector(0, 0.1);

    for (let i = 0; i < fireworkAmount; i++) {
      fireworks.push(createFirework());
    }
  };

  p.draw = () => {
    p.background(0);
    fireworks.forEach((firework) => {
      firework.applyForce(gravity);
      firework.update();
      firework.show();

      if (firework.isGoingDown() && !firework.exploded) {
        firework.explode();
      }

      if (firework.finished) {
        fireworks.splice(fireworks.indexOf(firework), 1, createFirework());
      }
    });
  };
});

const Fireworks = function () {
  const [sketch, setSketch] = React.useState(null);

  const removeSketch = () => {
    if (sketch) sketch.remove();
    fireworks = [];
  };

  React.useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);

    return removeSketch;
  }, []);

  const handleRefresh = () => {
    removeSketch();
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Layout handleRefresh={handleRefresh}>
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default Fireworks;
