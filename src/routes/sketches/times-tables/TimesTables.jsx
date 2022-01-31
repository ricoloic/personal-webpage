import React from 'react';
import P5 from 'p5';
import { Input, ListItemText, Slider } from '@material-ui/core';
import Layout from '../../../components/layout';

let amt = 4000;
let r;
let f = 2;
let transparency = 100;
let cx;
let cy;

const makeSketch = () => new P5((p) => {
  const getPos = (itt) => {
    const ang = p.map(itt, 0, amt, 0, p.TWO_PI);
    const x = (p.cos(ang) * r);
    const y = (p.sin(ang) * r);
    return { x: x + cx, y: y + cy };
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    cx = (p.width / 2);
    cy = (p.height / 2);
    r = p.min(cx, cy) - 50;
    p.strokeWeight(1);
    p.frameRate(30);
    p.textSize(45);
  };

  p.draw = () => {
    p.background(220);
    p.stroke(33, transparency);
    for (let i = 0; i < amt; i++) {
      const { x: x1, y: y1 } = getPos(i);
      const j = (i * f) % amt;
      const { x: x2, y: y2 } = getPos(j);

      p.line(x1, y1, x2, y2);
    }
  };
});

const TimesTables = function () {
  const [sketch, setSketch] = React.useState(null);
  const [multiplier, setMultiplier] = React.useState(f);
  const [lineAmount, setLineAmount] = React.useState(amt);
  const [transparencyState, setTransparencyState] = React.useState(transparency);

  const removeSketch = (s = sketch) => {
    s.remove();
  };

  React.useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => removeSketch(newSketch);
  }, []);

  const handleRefresh = () => {
    removeSketch(sketch);
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleMultiplierChange = (v) => {
    f = v;
    setMultiplier(v);
  };

  const handleLineAmountChange = (v) => {
    amt = v;
    setLineAmount(v);
  };

  const handleTransparencyChange = (v) => {
    transparency = v;
    setTransparencyState(v);
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      controls={[
        {
          key: 'Multiplier',
          control: (
            <>
              <ListItemText>Multiplier</ListItemText>
              <Input
                type="number"
                value={multiplier}
                fullWidth
                variant="number"
                onChange={(e) => handleMultiplierChange(e.target.value)}
              />
              <Slider
                name="multiplier"
                value={multiplier}
                onChange={(e, v) => handleMultiplierChange(v)}
                min={2}
                max={700}
                step={1}
                defaultValue={2}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Line Amount',
          control: (
            <>
              <ListItemText>Line Amount</ListItemText>
              <Slider
                name="lineAmount"
                value={lineAmount}
                onChange={(e, v) => handleLineAmountChange(v)}
                min={10}
                max={4000}
                step={10}
                defaultValue={10}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Transparency',
          control: (
            <>
              <ListItemText>Transparency</ListItemText>
              <Slider
                name="transparency"
                value={transparencyState}
                onChange={(e, v) => handleTransparencyChange(v)}
                min={10}
                max={255}
                step={10}
                defaultValue={10}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
      ]}
    >
      <div className="sketch-container" id="parent" />
    </Layout>
  );
};

export default TimesTables;
