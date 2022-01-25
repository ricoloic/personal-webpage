import React, { useEffect } from 'react';
import P5 from 'p5';
import { Particle } from './particle';
import Layout from '../../../components/layout';

let particles = [];
let center = { x: 0, y: 0 };
let blackHole = { pos: null };

const getAvgPosition = (posArray) => {
  const arrLength = posArray.length;
  const accumulation = posArray.reduce((avg, nextPos) => {
    avg.x += nextPos.x;
    avg.y += nextPos.y;
    return avg;
  }, { x: 0, y: 0 });
  accumulation.x /= arrLength;
  accumulation.y /= arrLength;
  return accumulation;
};

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    center = { x: p.width / 2, y: p.height / 2 };
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    p.ellipseMode(p.CENTER);
    center = { x: p.width / 2, y: p.height / 2 };
    blackHole = { pos: p.createVector(center.x, center.y) };

    p.mousePressed = () => {
      particles.push(new Particle(p, { x: p.mouseX, y: p.mouseY }, 10, 300));
    };
  };

  p.draw = () => {
    p.background(220);

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      const force = p
        .constructor
        .Vector
        .sub(blackHole.pos, particle.pos)
        .normalize()
        .setMag(0.7);
      particle.applyForce(force);
      particle.update();
      // particle.updateLifeTime();
      particle.show();
      particle.showTrail(10);
      if (particle.lifeTime < 1) particles.splice(i, 1);
    }

    const avgPos = particles.length === 0 ? center : getAvgPosition(
      particles.map((particle) => particle.pos),
    );

    p.fill(0);
    p.ellipse(blackHole.pos.x, blackHole.pos.y, 50);
    p.fill(255);
    p.ellipse(avgPos.x, avgPos.y, 30);
  };
});

const BlackHole = function () {
  const [sketch, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      particles = [];
      center = { x: 0, y: 0 };
      blackHole = { pos: null };
      newSketch.remove();
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    particles = [];
    center = { x: 0, y: 0 };
    blackHole = { pos: null };
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      sketchDescription={[
        'Black Hole',
        'A sketch to simulate a black hole, visually',
        'Click to add particles/planets',
        'The white circle is drawn at the average position of all the particles/planets',
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default BlackHole;
