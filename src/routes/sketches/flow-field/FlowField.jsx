import React, { useEffect } from 'react';
import P5 from 'p5';
import { Particle } from './particle';
import { Flow } from './flow';
import Layout from '../../../Layout';
import { useLooping } from '../utils';

const colorOptions = {
  original: () => [26, 51, 43, 0.1],
  dark: () => [0, 0, 0, 0.1],
  colorful: (frameCount) => [frameCount % 255, 255, 255, 0.1],
  blue: (frameCount) => [(frameCount % 75) + 180, 255, 255, 0.1],
  turqouise: (frameCount) => [(frameCount % 60) + 150, 255, 255, 0.1],
  fire: (frameCount) => [(frameCount % 70) + 10, 255, 255, 0.1],
};

let selectedColor = 'original';

let scl = 10;
let inc = 0.1;
let cols = null;
let rows = null;
let zoff = 0;
let particles = [];
let flowField = [];
let lod = 10;
let fallOff = 0.6;
let displayFlow = false;
const isLoop = true;

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.P2D).parent('parent');

    p.background(255);
    p.stroke(0, 2);
    p.noiseDetail(lod, fallOff);

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
    p.colorMode(p.HSB);
    // p.frameRate(20);
  };

  p.draw = () => {
    if (displayFlow) {
      p.background(225);
    }
    let yoff = 0;
    for (let y = 0; y <= rows; y++) {
      let xoff = 0;
      for (let x = 0; x <= cols; x++) {
        const index = x + y * cols;
        const flow = flowField[index];

        flow.update(xoff, yoff, zoff);
        if (displayFlow) {
          // console.log('hey');
          p.stroke(0, 0, 0, 1);
          p.strokeWeight(2);
          flow.show(scl, x, y);
        }

        xoff += inc;
      }
      yoff += inc;
    }
    zoff += 0.001;

    if (!displayFlow) {
      const color = colorOptions[selectedColor](p.frameCount);
      particles.forEach((particle) => {
        particle.update();
        particle.wrapAround();
        particle.follow(scl, cols, flowField);
        particle.show(color);
      });
    }
  };
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const FlowField = function () {
  const [sketch, setSketch] = React.useState(null);
  const [lodState, setLodState] = React.useState(lod);
  const [fallOffState, setFallOffState] = React.useState(fallOff);
  const [isLooping, setIsLooping] = useLooping(sketch, isLoop);

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
      selectedColor = 'original';
      newSketch.remove();
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    cols = null;
    rows = null;
    // fs = null;
    zoff = 0;
    particles = [];
    flowField = [];
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleColorChange = ({ target: { value } }) => {
    selectedColor = value;
    handleRefresh();
  };

  const handleLodChange = ({ target: { value } }) => {
    setLodState(value);
    lod = parseFloat(value);
    handleRefresh();
  };

  const handleFallOffChange = ({ target: { value } }) => {
    setFallOffState(value);
    fallOff = parseFloat(value);
    handleRefresh();
  };

  const handleSave = () => {
    sketch.saveCanvas(sketch.canvas, 'flowfield', 'png');
  };

  const handleDisplayFlowChange = () => {
    displayFlow = !displayFlow;
    if (displayFlow) scl = 40;
    else scl = 10;
    handleRefresh();
  };

  return (
    <Layout
      isLooping={isLooping}
      handleLooping={setIsLooping}
      handleRefresh={handleRefresh}
      handleSave={handleSave}
      rightComponent={(
        <>
          <label htmlFor="display-flow">
            Display Flow
            <input id="fisplay-flow" type="checkbox" value={displayFlow} onChange={handleDisplayFlowChange} />
          </label>
          <label htmlFor="select-lod" type="range">
            Lod
            {' '}
            {lodState}
            <input type="range" id="select-lod" onChange={handleLodChange} min={2} max={20} step={1} value={lodState} />
          </label>
          <label htmlFor="select-falloff" type="range">
            Fall Off
            {' '}
            {fallOffState}
            <input type="range" id="select-falloff" onChange={handleFallOffChange} min={0.5} max={1} step={0.05} value={fallOffState} />
          </label>
          <label htmlFor="select-color">
            <select
              id="select-color"
              onChange={handleColorChange}
            >
              {Object.keys(colorOptions).map((color) => (
                <option
                  key={color}
                  value={color}
                >
                  {capitalizeFirstLetter(color)}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default FlowField;
