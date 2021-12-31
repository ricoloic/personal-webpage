import React, { useEffect } from 'react';
import P5 from 'p5';
import Layout from '../../../Layout';

let n = 2; let
  d = 29;
let color = true;

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    p.angleMode(p.DEGREES);
  };

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);
    p.background(20);
    p.stroke(230);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < 360; i++) {
      const k = i * d;
      const r = 200 * p.sin(n * k);
      const x = r * p.cos(k);
      const y = r * p.sin(k);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);

    if (color) {
      p.stroke(p.color('tomato'));
      p.strokeWeight(2);
      p.beginShape();
      for (let i = 0; i < 360; i++) {
        const r = 200 * p.sin(n * i);
        const x = r * p.cos(i);
        const y = r * p.sin(i);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
    }
  };
});

const MaurerRose = function () {
  const [sketch, setSketch] = React.useState();
  const [nState, setNState] = React.useState(n);
  const [dState, setDState] = React.useState(d);
  const [colorState, setColorState] = React.useState(color);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      newSketch.remove();
      n = 2;
      d = 29;
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    n = 2;
    d = 29;
  };

  const handleChangeColor = () => {
    color = !color;
    setColorState(color);
  };

  const handleChangeN = ({ target: { value } }) => {
    n = parseFloat(value);
    setNState(n);
  };

  const handleChangeD = ({ target: { value } }) => {
    d = parseFloat(value);
    setDState(d);
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      rightComponent={(
        <>
          <label htmlFor="color">
            Display Color
            <input
              type="checkbox"
              id="color"
              onChange={handleChangeColor}
              checked={colorState}
            />
          </label>
          <label type="range" htmlFor="n">
            n
            {' '}
            {nState}
            <input
              id="n"
              type="range"
              value={nState}
              onChange={handleChangeN}
            />
          </label>
          <label type="range" htmlFor="d">
            d
            {' '}
            {dState}
            <input
              id="d"
              type="range"
              value={dState}
              onChange={handleChangeD}
            />
          </label>
        </>
      )}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default MaurerRose;
