import React, { useEffect } from 'react';
import P5 from 'p5';
import { Particle } from './particle';

let particles = [];
let center = { x: 0, y: 0 };

const MouseFollow = function () {
  const [, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = new P5((p) => {
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('parent');
        center.x = p.width / 2;
        center.y = p.height / 2;
      };

      p.draw = () => {
        p.background(100);
        p.translate(center.x, center.y);

        for (let i = 0; i < 10; i++) {
          const particle = new Particle(p, center);
          particles.push(particle);
        }

        particles.forEach((particle) => {
          particle.update();
          particle.show();
        });
        particles = particles.filter((particle) => !particle.finished());

        const sumV = particles.reduce(
          (v, particle) => v.add(particle.pos.x, particle.pos.y),
          new p.constructor.Vector(0, 0),
        );
        const cntV = sumV.div(particles.length);

        p.fill(255, 0, 0);
        p.circle(cntV.x, cntV.y, 50);
      };
    });

    setSketch(newSketch);

    return () => {
      particles = [];
      center = { x: 0, y: 0 };
      newSketch.remove();
    };
  }, []);

  return <div id="parent" className="sketch-container" />;
};

export default MouseFollow;
