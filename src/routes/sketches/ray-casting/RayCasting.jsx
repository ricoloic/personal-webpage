import React from 'react';
import P5 from 'p5';
import Layout from '../../../components/layout';
import { Caster } from './caster';
import { BoxBoundary } from './boxBoundary';

let boundaries = [];
let caster = null;

const getSidesBoundaries = (p) => {
  const w = p.width - 1;
  const h = p.height - 1;
  return new BoxBoundary(
    p,
    p.createVector(1, 1),
    p.createVector(w, 1),
    p.createVector(w, h),
    p.createVector(1, h),
  );
};

const getRandomVertex = (p) => {
  const x = p.random(10, p.width - 10);
  const y = p.random(10, p.height - 10);
  return p.createVector(x, y);
};

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    // const seed = p.floor(p.random(100000));
    // good seeds: 64411
    p.randomSeed(64411);
    // console.log(64411);

    const centerPos = p.createVector(p.width / 2, p.height / 2);
    caster = new Caster(p, centerPos);

    for (let i = 0; i < 2; i++) {
      boundaries.push(new BoxBoundary(
        p,
        getRandomVertex(p),
        getRandomVertex(p),
        getRandomVertex(p),
        getRandomVertex(p),
      ));
    }
    boundaries.push(getSidesBoundaries(p));
  };

  p.draw = () => {
    p.background(30);
    caster.setPos(p.mouseX, p.mouseY);
    caster.cast(boundaries.map((boundary) => boundary.lines).flat());
    boundaries.forEach((b) => b.show());
  };
});

const RayCasting = function () {
  const [sketch, setSketch] = React.useState(null);

  const removeSketch = (s = sketch) => {
    s.remove();
    setSketch(null);
    caster = null;
    boundaries = [];
  };

  React.useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => removeSketch(newSketch);
  }, []);

  const handleRefresh = () => {
    removeSketch();
    setSketch(makeSketch());
  };

  return (
    <Layout handleRefresh={handleRefresh}>
      <div className="sketch-container" id="parent" />
    </Layout>
  );
};

export default RayCasting;
