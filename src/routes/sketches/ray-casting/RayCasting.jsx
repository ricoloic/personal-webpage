import React from 'react';
import P5 from 'p5';
import Layout from '../../../components/layout';
import { Caster } from './caster';
import { LineBoundary } from './lineBoundary';

const boundaries = [];
let caster = null;

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    const seed = p.floor(p.random(100000));
    p.randomSeed(seed);
    console.log(seed);

    const centerPos = p.createVector(p.width / 2, p.height / 2);
    caster = new Caster(p, centerPos);

    for (let i = 0; i < 5; i += 1) {
      const pt1 = p.createVector(p.random(p.width), p.random(p.height));
      const pt2 = p.createVector(p.random(p.width), p.random(p.height));
      boundaries.push(new LineBoundary(p, pt1, pt2));
    }

    const top = new LineBoundary(p, p.createVector(0, 0), p.createVector(p.width, 0));
    const bottom = new LineBoundary(p, p.createVector(0, p.height), p.createVector(p.width, p.height));
    const left = new LineBoundary(p, p.createVector(0, 0), p.createVector(0, p.height));
    const right = new LineBoundary(p, p.createVector(p.width, 0), p.createVector(p.width, p.height));
    [top, bottom, left, right].forEach((boundary) => {
      boundaries.push(boundary);
    });
  };

  p.draw = () => {
    p.background(30);

    caster.show();
    caster.setPos(p.mouseX, p.mouseY);
    caster.cast(boundaries);
    boundaries.forEach((b) => b.show());
  };
});

const RayCasting = function () {
  const [sketch, setSketch] = React.useState(null);

  const removeSketch = () => {
    sketch.remove();
    setSketch(null);
    caster = null;
  };

  React.useEffect(() => {
    setSketch(makeSketch());
    return removeSketch;
  }, []);

  return (
    <Layout>
      <div className="sketch-container" id="parent" />
    </Layout>
  );
};

export default RayCasting;
