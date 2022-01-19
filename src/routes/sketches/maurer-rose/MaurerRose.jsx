import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  Checkbox, FormControlLabel, ListItemText, Slider,
} from '@material-ui/core';
import Layout from '../../../Layout';

let n = 2;
let d = 29;
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

    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleChangeColor = () => {
    color = !color;
    setColorState(color);
  };

  const handleChangeN = (v) => {
    n = v;
    setNState(v);
  };

  const handleChangeD = (v) => {
    d = v;
    setDState(d);
  };

  const handleSave = () => {
    sketch.saveCanvas(sketch.canvas, 'maurer-rose', 'png');
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      handleSave={handleSave}
      controls={[
        {
          key: 'Color',
          control: (
            <FormControlLabel
              label={<ListItemText>Color</ListItemText>}
              control={(
                <Checkbox
                  checked={colorState}
                  onChange={handleChangeColor}
                />
              )}
            />
          ),
        },
        {
          key: 'N',
          control: (
            <>
              <ListItemText>N</ListItemText>
              <Slider
                value={nState}
                onChange={(e, v) => handleChangeN(v)}
                min={2}
                max={59}
                defaultValue={2}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'D',
          control: (
            <>
              <ListItemText>D</ListItemText>
              <Slider
                value={dState}
                onChange={(e, v) => handleChangeD(v)}
                min={2}
                max={59}
                defaultValue={2}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default MaurerRose;
