import React, { useMemo, useEffect } from 'react';
import P5 from 'p5';
import { ListItemText, Slider } from '@material-ui/core';
import Layout from '../../../components/layout';

let size = 30;
let offset = 75;

function Clock() {
  const [sketch, setSketch] = React.useState(null);
  const [offsetState, setOffsetState] = React.useState(75);
  const [sizeState, setSizeState] = React.useState(30);

  const makeSketch = useMemo(() => (() => new P5((p) => {
    const baseOffset = 135;
    const time = {
      h: 0,
      m: 0,
      s: 0,
    };
    let smallest = null;
    const center = { x: 0, y: 0 };
    const getParsedTime = () => {
      const date = new Date();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      time.h = p.map(h, 0, 24, 0, p.TWO_PI);
      time.m = p.map(m, 0, 60, 0, p.TWO_PI);
      time.s = p.map(s, 0, 60, 0, p.TWO_PI);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.setup = () => {
      p.pixelDensity(1);
      p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
      p.noFill();
      smallest = p.width > p.height ? p.height : p.width;
      center.x = p.width / 2;
      center.y = p.height / 2;
      getParsedTime();
      setInterval(() => getParsedTime(), 1000);
    };

    p.draw = () => {
      p.background(220);
      p.translate(center.x, center.y);
      p.rotate(-p.HALF_PI);

      const sizeS = smallest - baseOffset;
      p.strokeWeight(size);
      p.stroke(237, 174, 73);
      p.arc(0, 0, sizeS, sizeS, 0, time.s);
      const xS = (sizeS / 3) * p.cos(time.s);
      const yS = (sizeS / 3) * p.sin(time.s);
      p.line(0, 0, xS, yS);

      const sizeM = smallest - baseOffset - offset;
      p.strokeWeight(size);
      p.stroke(209, 73, 91);
      p.arc(0, 0, sizeM, sizeM, 0, time.m);
      const xM = (sizeM / 3) * p.cos(time.m);
      const yM = (sizeM / 3) * p.sin(time.m);
      p.line(0, 0, xM, yM);

      const sizeH = smallest - baseOffset - offset * 2;
      p.strokeWeight(size);
      p.stroke(0, 121, 140);
      p.arc(0, 0, sizeH, sizeH, 0, time.h);
      const xH = (sizeH / 3) * p.cos(time.h);
      const yH = (sizeH / 3) * p.sin(time.h);
      p.line(0, 0, xH, yH);
    };
  })), []);

  const removeSketch = (s = sketch) => {
    if (s) s.remove();
  };

  const handleSizeChange = (v) => {
    setSizeState(v);
    size = v;
  };

  const handleOffsetChange = (v) => {
    setOffsetState(v);
    offset = v;
  };

  useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);

    return () => {
      removeSketch(newSketch);
    };
  }, []);

  return (
    <Layout
      controls={[
        {
          key: 'Line Size',
          control: (
            <>
              <ListItemText>Line Size</ListItemText>
              <Slider
                value={sizeState}
                min={10}
                max={100}
                step={1}
                defaultValue={30}
                valueLabelDisplay="auto"
                onChange={(e, v) => handleSizeChange(v)}
              />
            </>
          ),
        },
        {
          key: 'Line Spacing',
          control: (
            <>
              <ListItemText>Line Spacing</ListItemText>
              <Slider
                value={offsetState}
                min={30}
                max={200}
                step={1}
                defaultValue={75}
                valueLabelDisplay="auto"
                onChange={(e, v) => handleOffsetChange(v)}
              />
            </>
          ),
        },
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
}

export default Clock;
