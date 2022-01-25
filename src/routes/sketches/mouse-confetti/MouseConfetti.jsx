import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  FormControl, ListItemText, MenuItem, Select,
} from '@material-ui/core';
import Layout from '../../../components/layout';
import Confetti from './confetti';
import { capitalizeFirstLetter } from '../utils';

let confettiList = [];
const colorPalettes = {
  default: [
    'rgb(246, 82, 160)',
    'rgb(54, 238, 224)',
    'rgb(188, 236, 224)',
  ],
  fun: [
    '#f94144',
    '#f3722c',
    '#f8961e',
    '#f9844a',
    '#f9c74f',
    '#90be6d',
    '#43aa8b',
    '#4d908e',
    '#577590',
    '#277da1',
  ],
};
let selectedColorPalette = 'default';

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    p.noFill();
  };

  p.draw = () => {
    p.background(30);
    confettiList.push(new Confetti(p, p.mouseX, p.mouseY, colorPalettes[selectedColorPalette]));
    confettiList.forEach((confetti, index) => {
      confetti.animate();
      if (confetti.life < 1) confettiList.splice(index, 1);
    });
  };
});

const MouseConfetti = function () {
  const [sketch, setSketch] = React.useState(null);
  const [selectedColorPaletteState, setSelectedColorPaletteState] = React.useState(selectedColorPalette);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      newSketch.remove();
      confettiList = [];
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    confettiList = [];
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleColorPaletteChange = (event) => {
    selectedColorPalette = event.target.value;
    setSelectedColorPaletteState(event.target.value);
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      sketchDescription={`
        A simple sketch that uses the p5.js library to create a confetti effect.
        The confetti is created using the mouse position as the starting point.
        The confetti is then animated using randomly generated vectors as there velocity.
        You can change the colors by clicking on the settings icon.
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
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default MouseConfetti;
