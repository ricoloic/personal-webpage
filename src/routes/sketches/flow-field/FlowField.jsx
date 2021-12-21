import React, { useEffect } from 'react';
import P5 from 'p5';
import { Particle } from './particle';
import { Flow } from './flow';
import Layout from '../../../Layout';

let scl = 10;
let inc = 0.1;
let cols = null;
let rows = null;
// let fs;
let zoff = 0;
let particles = [];
let flowField = [];

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.P2D).parent('parent');
    // fs = p5.createP("");

    p.background(255);
    // strokeWeight(4);
    p.stroke(0, 2);
    p.noiseDetail(10, 0.6);

    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        flowField.push(new Flow(p));
      }
    }

    for (let i = 0; i < 2000; i++) {
      particles.push(new Particle(p));
    }
  };

  p.draw = () => {
    // p.background(225);

    let yoff = 0;
    for (let y = 0; y <= rows; y++) {
      let xoff = 0;
      for (let x = 0; x <= cols; x++) {
        const index = x + y * cols;
        const flow = flowField[index];
        flow.update(xoff, yoff, zoff);
        // flow.show(scl, x, y);

        xoff += inc;
      }
      yoff += inc;
    }
    zoff += 0.001;

    particles.forEach((particle) => {
      particle.update();
      particle.wrapAround();
      particle.follow(scl, cols, flowField);
      particle.show();
    });

    // fs.html(floor(frameRate()));
    // console.log(frameRate());
    // p.noLoop();
  };
});

const FlowField = function () {
  const [sketch, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      scl = 10;
      inc = 0.1;
      cols = null;
      rows = null;
      // fs = null;
      zoff = 0;
      particles = [];
      flowField = [];
      newSketch.remove();
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    scl = 10;
    inc = 0.1;
    cols = null;
    rows = null;
    // fs = null;
    zoff = 0;
    particles = [];
    flowField = [];
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Layout handleRefresh={handleRefresh}>
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default FlowField;
