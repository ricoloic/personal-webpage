import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  FormControl, ListItemText, MenuItem, Select, Slider,
} from '@material-ui/core';
import Layout from '../../../components/layout';
import Particle from './particle';
import colorPalettes from './colorPalettes';
import { capitalizeFirstLetter } from '../utils';

let particles = [];
let latestMousePos = [];
let lineAmount = 10;
let avgMousePos = null;
let selectedColorPalette = 'default';

const updateLatestMousePos = (p5) => {
  if (latestMousePos.length > 17) latestMousePos.splice(0, 1);
  latestMousePos.push({ x: p5.mouseX, y: p5.mouseY });
};

const updateAvgMousePos = (p5) => {
  const tempAvgMousePos = latestMousePos.reduce(
    (acc, curr) => ({ x: acc.x + curr.x, y: acc.y + curr.y }),
    { x: 0, y: 0 },
  );
  tempAvgMousePos.x = p5.floor(tempAvgMousePos.x / latestMousePos.length);
  tempAvgMousePos.y = p5.floor(tempAvgMousePos.y / latestMousePos.length);
  avgMousePos = { ...tempAvgMousePos };
};

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    particles = new Array(lineAmount);
    for (let i = 0; i < particles.length; i++) {
      particles[i] = new Particle(
        p,
        p.width / 2,
        p.height / 2,
        p.random(colorPalettes[selectedColorPalette]),
        p.random(0.02, 0.04),
        p.floor(p.random(15, 40)),
      );
    }
    latestMousePos = [];
    avgMousePos = { x: 0, y: 0 };
    p.noFill();
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      updateLatestMousePos(p);
      updateAvgMousePos(p);
    }
    p.background(0);
    for (let i = 0; i < particles.length; i++) {
      particles[i].animate(p.mouseIsPressed, avgMousePos);
    }
  };

  p.mousePressed = () => {
    avgMousePos = { x: p.mouseX, y: p.mouseY };
    latestMousePos = [];
    particles.forEach((particle) => {
      particle.trails = [];
    });
  };

  p.mouseClicked = () => {
    particles.forEach((particle) => {
      particle.trails = [];
    });
  };
});

const CircularMotion = function () {
  const [sketch, setSketch] = React.useState(null);
  const [selectedColorPaletteState, setSelectedColorPaletteState] = React.useState(selectedColorPalette);
  const [lineAmountState, setLineAmountState] = React.useState(lineAmount);

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

  const handleColorPaletteChange = (event) => {
    selectedColorPalette = event.target.value;
    setSelectedColorPaletteState(event.target.value);
    sketch.remove();
    particles = [];
    latestMousePos = [];
    avgMousePos = null;
    setSketch(makeSketch());
  };

  const handleLineAmountChange = (v) => {
    lineAmount = v;
    setLineAmountState(v);
    sketch.remove();
    particles = [];
    latestMousePos = [];
    avgMousePos = null;
    setSketch(makeSketch());
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      sketchDescription={`
        A sketch that animates a circular motion.
        The user can click and drag to create a moving circular motion.
      `}
      controls={[
        {
          key: 'Color Palette',
          control: (
            <FormControl fullWidth>
              <ListItemText>
                Color Palette
              </ListItemText>
              <Select
                labelId="color-label"
                id="color-select"
                value={selectedColorPaletteState}
                label="Color"
                onChange={handleColorPaletteChange}
                variant="filled"
                size="small"
              >
                {Object.keys(colorPalettes).map((color) => (
                  <MenuItem
                    key={color}
                    value={color}
                  >
                    {capitalizeFirstLetter(color)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ),
        },
        {
          key: 'Line Amount',
          control: (
            <>
              <ListItemText>Line Amount</ListItemText>
              <Slider
                value={lineAmountState}
                onChange={(e, v) => handleLineAmountChange(v)}
                min={10}
                max={20}
                defaultValue={10}
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

export default CircularMotion;
