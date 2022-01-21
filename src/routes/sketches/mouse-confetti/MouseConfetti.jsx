import React, { useEffect } from 'react';
import P5 from 'p5';
import Index from '../../../components/layout';
import Confetti from './confetti';

let confettiList = [];

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    p.noFill();
  };

  p.draw = () => {
    p.background(30);
    confettiList.push(new Confetti(p, p.mouseX, p.mouseY));
    confettiList.forEach((confetti, index) => {
      confetti.animate();
      if (confetti.life < 1) confettiList.splice(index, 1);
    });
  };
});

const MouseConfetti = function () {
  const [sketch, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      newSketch.remove();
      confettiList = [];
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    confettiList = [];
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Index handleRefresh={handleRefresh}>
      <div id="parent" className="sketch-container" />
    </Index>
  );
};

export default MouseConfetti;
