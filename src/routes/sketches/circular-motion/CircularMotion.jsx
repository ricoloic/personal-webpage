import React, { useEffect } from 'react';
import P5 from 'p5';
import Index from '../../../components/layout';
import Particle from './particle';
import colorPalettes from './colorPalettes';

let particles = [];
let latestMousePos = [];
let avgMousePos = null;
const sunReadyColors = colorPalettes[0].colors;

function updateLatestMousePos(p5) {
  if (latestMousePos.length > 17) latestMousePos.splice(0, 1);
  latestMousePos.push({ x: p5.mouseX, y: p5.mouseY });
}

function updateAvgMousePos(p5) {
  // eslint-disable-next-line arrow-body-style
  const tempAvgMousePos = latestMousePos.reduce((acc, curr) => {
    return { x: acc.x + curr.x, y: acc.y + curr.y };
  }, { x: 0, y: 0 });
  tempAvgMousePos.x = p5.floor(tempAvgMousePos.x / latestMousePos.length);
  tempAvgMousePos.y = p5.floor(tempAvgMousePos.y / latestMousePos.length);
  avgMousePos = { ...tempAvgMousePos };
}

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    particles = new Array(10);
    for (let i = 0; i < particles.length; i++) {
      // eslint-disable-next-line max-len
      particles[i] = new Particle(p, p.width / 2, p.height / 2, 5, p.random(sunReadyColors), p.random(0.02, 0.04), p.floor(p.random(50, 100)));
    }
    latestMousePos = [];
    avgMousePos = { x: 0, y: 0 };
    p.noStroke();
  };

  p.draw = () => {
    updateLatestMousePos(p);
    updateAvgMousePos(p);
    p.background(p.color('black'));
    for (let i = 0; i < particles.length; i++) {
      particles[i].animate(p.mouseIsPressed, avgMousePos);
    }
  };
});

const CircularMotion = function () {
  const [sketch, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      newSketch.remove();
      particles = [];
      latestMousePos = [];
      avgMousePos = null;
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    particles = [];
    latestMousePos = [];
    avgMousePos = null;
    setSketch(makeSketch());
  };

  return (
    <Index handleRefresh={handleRefresh}>
      <div id="parent" className="sketch-container" />
    </Index>
  );
};

export default CircularMotion;
