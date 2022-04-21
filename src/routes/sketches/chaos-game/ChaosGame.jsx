import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  InputLabel, Slider,
} from '@material-ui/core';
import { TwitterPicker } from 'react-color';
import Index from '../../../components/layout';

let pointAmount = 3;
let lerpAmount = 0.5;
let selectedColor = '#ff0000';
let randomPoints = false;
let iteration = 100;
let size = 0;
let maxSize;
let seedPoints = [];
let current;
let previous;
const center = { x: 0, y: 0 };

const pickSeedPoints = (p, rando = false) => {
  const radius = (maxSize / 2) - 10;
  const points = [];
  let point;

  const randomPoint = () => {
    const x = p.random(-center.x, center.x);
    const y = p.random(-center.y, center.y);
    return { x, y };
  };

  const pointInCircle = (i) => {
    const angle = (i * p.TWO_PI) / pointAmount;
    const x = radius * p.cos(angle);
    const y = radius * p.sin(angle);
    return { x, y };
  };

  for (let i = 0; i < pointAmount; i++) {
    if (rando) point = randomPoint();
    else point = pointInCircle(i);
    points.push(point);
  }
  return [...points];
};

const drawChaosPoints = (p, typeS = '') => {
  const lerpCurrent = (currentP, nextP) => {
    currentP.x = p.lerp(nextP.x, currentP.x, lerpAmount);
    currentP.y = p.lerp(nextP.y, currentP.y, lerpAmount);
  };

  for (let i = 0; i < iteration; i++) {
    p.stroke(selectedColor);
    p.strokeWeight(1);
    p.point(current.x, current.y);

    const next = p.random(seedPoints);

    switch (typeS) {
      case '':
        lerpCurrent(current, next);
        break;
      case 'not-same-as-prev':
        if (next !== previous) lerpCurrent(current, next);
        previous = next;
        break;
      default:
        break;
    }
  }
};

const makeSketch = () => new P5((p) => {
  const setSketch = () => {
    size = window.innerWidth <= window.innerHeight ? window.innerWidth : window.innerHeight;
    maxSize = size - size / 50;
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    center.x = p.width / 2;
    center.y = p.height / 2;
    current = { x: p.random(size), y: p.random(size) };
    seedPoints = pickSeedPoints(p, randomPoints);
    p.background(30);
  };

  p.windowResized = () => {
    setSketch();
  };

  p.setup = () => {
    setSketch();
  };

  p.draw = () => {
    p.translate(center.x, center.y);
    p.stroke(255);
    p.strokeWeight(10);
    seedPoints.forEach((point) => {
      p.point(point.x, point.y);
    });

    drawChaosPoints(p, '');
  };
});

const ChaosGame = function () {
  const [sketch, setSketch] = React.useState(null);
  const [pointAmountState, setPointAmountState] = React.useState(3);
  const [lerpAmountState, setLerpAmountState] = React.useState(0.5);

  const resetSketchValues = () => {
    pointAmount = 3;
    lerpAmount = 0.5;
    selectedColor = '#ff0000';
    randomPoints = false;
    iteration = 100;
    size = 0;
    maxSize = null;
    seedPoints = [];
    current = null;
    previous = null;
  };

  useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);

    return () => {
      newSketch.remove();
      resetSketchValues();
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleSelectedColorChange = (color) => {
    sketch.remove();
    selectedColor = color;
    setSketch(makeSketch());
  };

  const handlePointAmountChange = (v) => {
    sketch.remove();
    pointAmount = v;
    setPointAmountState(v);
    setSketch(makeSketch());
  };

  const handleLerpAmountChange = (v) => {
    sketch.remove();
    lerpAmount = v;
    setLerpAmountState(v);
    setSketch(makeSketch());
  };

  return (
    <Index
      handleRefresh={handleRefresh}
      sketchDescription={`
        This is a chaos game.
        The chaos game is a simple way to create a fractal.
        The chaos game is a type of fractal where the points are generated randomly.
        The points are then lerped an infinite amount of time to create a smooth line.
      `}
      controls={[
        {
          key: 'Lerp Amount',
          control: (
            <>
              <InputLabel id="lerp-amount-label">
                Lerp Amount (
                {lerpAmountState}
                )
              </InputLabel>
              <Slider
                value={lerpAmountState}
                onChange={(e, v) => handleLerpAmountChange(v)}
                aria-labelledby="lerp-amount-label"
                step={0.05}
                marks
                min={0.1}
                max={1.5}
              />
            </>
          ),
        },
        {
          key: 'Point Amount',
          control: (
            <>
              <InputLabel id="point-amount-label">
                Point Amount (
                {pointAmountState}
                )
              </InputLabel>
              <Slider
                value={pointAmountState}
                onChange={(e, v) => handlePointAmountChange(v)}
                aria-labelledby="point-amount-label"
                step={1}
                marks
                min={2}
                max={15}
              />
            </>
          ),
        },
        {
          key: 'Color',
          control: (
            <TwitterPicker
              triangle="hide"
              onChange={(color) => handleSelectedColorChange(color.hex)}
            />
          ),
        },
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Index>
  );
};

export default ChaosGame;
