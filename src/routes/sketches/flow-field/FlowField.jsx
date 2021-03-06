import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  Checkbox,
  FormControlLabel,
  Slider, FormControl, MenuItem, Select,
  ListItemText,
} from '@material-ui/core';
import { Particle } from './particle';
import { Flow } from './flow';
import Layout from '../../../components/layout';
import { capitalizeFirstLetter, useLooping } from '../utils';

const colorOptions = {
  original: () => [26, 51, 43, 0.1],
  dark: () => [0, 0, 0, 0.1],
  colorful: (frameCount) => [frameCount % 255, 255, 255, 0.1],
  blue: (frameCount) => [(frameCount % 75) + 180, 255, 255, 0.1],
  turqouise: (frameCount) => [(frameCount % 60) + 150, 255, 255, 0.1],
  fire: (frameCount) => [(frameCount % 70) + 10, 255, 255, 0.1],
};

let selectedColor = 'original';

const particleAmount = 2000;
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

    for (let i = 0; i < particleAmount; i++) {
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

        if (!flow) return;
        flow.update(xoff, yoff, zoff);
        if (displayFlow) {
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

const FlowField = function () {
  const [sketch, setSketch] = React.useState(null);
  const [lodState, setLodState] = React.useState(lod);
  const [fallOffState, setFallOffState] = React.useState(fallOff);
  const [colorState, setColorState] = React.useState(selectedColor);
  const [isLooping, setIsLooping] = useLooping(sketch, isLoop);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      newSketch.remove();
      scl = 10;
      inc = 0.1;
      cols = null;
      rows = null;
      // fs = null;
      zoff = 0;
      particles = [];
      flowField = [];
      selectedColor = 'original';
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
    setColorState(value);
    selectedColor = value;
    handleRefresh();
  };

  const handleLodChange = (v) => {
    setLodState(v);
    lod = v;
    handleRefresh();
  };

  const handleFallOffChange = (v) => {
    setFallOffState(v);
    fallOff = v;
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
      sketchDescription={[
        'A simple flow field generator',
        // eslint-disable-next-line max-len
        'The field of flow is generated by a noise function. The flow field is then displayed as a grid of lines. The flow field is then used to move the particles. The particles follow the closest flow field line',
        '',
        // eslint-disable-next-line max-len
        'You can modify some options by clicking the burger menu. You can save an image of the sketch by clicking the save button. You can restart the flow field by clicking the refresh button',
      ]}
      controls={[
        {
          key: 'Display Flow',
          control: (
            <FormControlLabel
              label={<ListItemText>Display Flow</ListItemText>}
              control={(
                <Checkbox
                  checked={displayFlow}
                  onChange={handleDisplayFlowChange}
                />
              )}
            />
          ),
        },
        {
          key: 'Lod',
          control: (
            <>
              <ListItemText>Lod</ListItemText>
              <Slider
                value={lodState}
                onChange={(e, v) => handleLodChange(v)}
                min={2}
                max={20}
                step={1}
                defaultValue={2}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Fall Off',
          control: (
            <>
              <ListItemText>
                Fall Off
              </ListItemText>
              <Slider
                value={fallOffState}
                onChange={(e, v) => handleFallOffChange(v)}
                min={0.5}
                max={1}
                step={0.05}
                defaultValue={2}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Color',
          control: (
            <FormControl fullWidth>
              <ListItemText>
                Color
              </ListItemText>
              <Select
                labelId="color-label"
                id="color-select"
                value={colorState}
                onChange={handleColorChange}
                variant="outlined"
                size="small"
              >
                {Object.keys(colorOptions).map((color) => (
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
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default FlowField;
