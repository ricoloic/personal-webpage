import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  Box, FormControl, InputLabel, ListItemText, MenuItem, Select, Slider,
} from '@material-ui/core';
import { TwitterPicker } from 'react-color';
import { Particle } from './particle';
import Index from '../../../components/layout';
import { COLOR_PALETTES } from '../constants';
import { capitalizeFirstLetter } from '../utils';
import Checkbox from '../../color-palettes/components/checkbox';

let selectColorPalette = 'happy';
let particles = [];
let particlesPerFrame = 10;
let center = { x: 0, y: 0 };
let blobColor = '#333333';
let particleColor = '#6b49a6';
let showParticles = true;
let showBlob = true;

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    center.x = p.width / 2;
    center.y = p.height / 2;
    p.noStroke();
  };

  p.draw = () => {
    p.background(250);
    p.translate(center.x, center.y);

    for (let i = 0; i < particlesPerFrame; i++) {
      const color = selectColorPalette === 'custom' ? particleColor : p.random(COLOR_PALETTES[selectColorPalette]).color;
      const particle = new Particle(p, center, color);
      particles.push(particle);
    }

    particles.forEach((particle) => {
      particle.update();
      if (!showParticles) return;
      particle.show();
    });
    particles = particles.filter((particle) => !particle.finished());

    if (showBlob) {
      const sumV = particles.reduce(
        (v, particle) => v.add(particle.pos.x, particle.pos.y),
        new p.constructor.Vector(0, 0),
      );
      const cntV = sumV.div(particles.length);
      p.fill(blobColor);
      p.circle(cntV.x, cntV.y, 50);
    }
  };
});

const MouseFollow = function () {
  const [sketch, setSketch] = React.useState(null);
  const [particlesPerFrameState, setParticlesPerFrameState] = React.useState(particlesPerFrame);
  const [showParticlesState, setShowParticlesState] = React.useState(true);
  const [selectedColorPaletteState, setSelectedColorPaletteState] = React.useState('deep');
  const [showBlobState, setShowBlobState] = React.useState(true);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      newSketch.remove();
      particles = [];
      center = { x: 0, y: 0 };
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    particles = [];
    center = { x: 0, y: 0 };
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleShowParticlesChange = () => {
    showParticles = !showParticles;
    setShowParticlesState(showParticles);
  };

  const handleColorPaletteChange = ({ target: { value } }) => {
    setSelectedColorPaletteState(value);
    selectColorPalette = value;
  };

  const handleShowBlobChange = () => {
    showBlob = !showBlob;
    setShowBlobState(showBlob);
  };

  const handleParticleColorChange = (color) => {
    particleColor = color;
  };

  const handleBlobColorChange = (color) => {
    blobColor = color;
  };

  return (
    <Index
      handleRefresh={handleRefresh}
      sketchDescription={`
        This sketch is a simple example of how to use the p5.js library to create a simple particle system.
        The particles are created by creating a new Particle object and pushing it into an array every animation frame.
        The Particle object has a position, velocity, and acceleration.
        The bigger circle is positioned at the average position of all the particles.
        Change the options by clicking on the settings Icon.
      `}
      controls={[
        {
          key: 'Show Blob',
          control: (
            <Checkbox
              name="show-blob-checkbox"
              label="Show Blob"
              checked={showBlobState}
              onChange={handleShowBlobChange}
            />
          ),
        },
        {
          key: 'Show Particles',
          control: (
            <Checkbox
              name="show-particles-checkbox"
              label="Show Particles"
              checked={showParticlesState}
              onChange={handleShowParticlesChange}
            />
          ),
        },
        {
          key: 'Particles per Frame',
          control: (
            <>
              <ListItemText>Particles per Frame</ListItemText>
              <Slider
                name="particlesPerFrame"
                value={particlesPerFrameState}
                onChange={(e, v) => {
                  particlesPerFrame = v;
                  setParticlesPerFrameState(v);
                }}
                min={1}
                max={15}
                step={1}
                defaultValue={10}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Particles Color',
          control: (
            <Box>
              <FormControl fullWidth>
                <ListItemText>
                  Color Palette
                </ListItemText>
                <Select
                  name="colorPalette"
                  labelId="color-label"
                  id="color-select"
                  value={selectedColorPaletteState}
                  onChange={handleColorPaletteChange}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem
                    key="custom"
                    value="custom"
                  >
                    Custom
                  </MenuItem>
                  {Object.keys(COLOR_PALETTES).map((color) => (
                    <MenuItem
                      key={color}
                      value={color}
                    >
                      {capitalizeFirstLetter(color)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ),
        },
        {
          key: 'Custom Particle Color',
          control: (
            <Box>
              {selectedColorPaletteState === 'custom' && (
                <>
                  <InputLabel id="custom-color-label">Custom Particle Color</InputLabel>
                  <br />
                  <TwitterPicker
                    triangle="hide"
                    onChange={(color) => handleParticleColorChange(color.hex)}
                  />
                </>
              )}
            </Box>
          ),
        },
        {
          key: 'Blob Color',
          control: (
            <Box>
              <InputLabel id="custom-color-label">Custom Blob Color</InputLabel>
              <br />
              <TwitterPicker
                triangle="hide"
                onChange={(color) => handleBlobColorChange(color.hex)}
              />
            </Box>
          ),
        },
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Index>
  );
};

export default MouseFollow;
