import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  Checkbox, FormControlLabel, ListItemText, Slider,
} from '@material-ui/core';
import { Particle } from './particle';
import Index from '../../../components/layout';

let particles = [];
let particlesPerFrame = 10;
let center = { x: 0, y: 0 };
let blobColor = 0;
let particleColor = 0;
let showParticles = true;

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    center.x = p.width / 2;
    center.y = p.height / 2;
    p.noStroke();
    p.colorMode(p.HSB);
  };

  p.draw = () => {
    p.background(100);
    p.translate(center.x, center.y);

    for (let i = 0; i < particlesPerFrame; i++) {
      const particle = new Particle(p, center);
      particles.push(particle);
    }

    particles.forEach((particle) => {
      particle.update();
      if (!showParticles) return;
      particle.show(particleColor);
    });
    particles = particles.filter((particle) => !particle.finished());

    const sumV = particles.reduce(
      (v, particle) => v.add(particle.pos.x, particle.pos.y),
      new p.constructor.Vector(0, 0),
    );
    const cntV = sumV.div(particles.length);
    p.fill(blobColor, 100, 100);
    p.circle(cntV.x, cntV.y, 50);
  };
});

const MouseFollow = function () {
  const [sketch, setSketch] = React.useState(null);
  const [blobColorState, setBlobColorState] = React.useState(blobColor);
  const [particlesPerFrameState, setParticlesPerFrameState] = React.useState(particlesPerFrame);
  const [particleColorState, setParticleColorState] = React.useState(particleColor);
  const [showParticlesState, setShowParticlesState] = React.useState(true);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      particles = [];
      center = { x: 0, y: 0 };
      newSketch.remove();
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

  return (
    <Index
      handleRefresh={handleRefresh}
      sketchDescription={`
        This sketch is a simple example of how to use the p5.js library to create a simple particle system.
        The particles are created by creating a new Particle object and pushing it into an array every animation frame.
        The Particle object has a position, velocity, and acceleration.
        The bigger circle is positioned at the average position of all the particles.
        Change the options by clicking on the burger menu.
      `}
      controls={[
        {
          key: 'Show Particles',
          control: (
            <FormControlLabel
              label={<ListItemText>Show Particles</ListItemText>}
              control={(
                <Checkbox
                  checked={showParticlesState}
                  onChange={handleShowParticlesChange}
                />
              )}
            />
          ),
        },
        {
          key: 'Particles per Frame',
          control: (
            <>
              <ListItemText>Particles per Frame</ListItemText>
              <Slider
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
            <>
              <ListItemText>Particles Color (HSB)</ListItemText>
              <Slider
                value={particleColorState}
                onChange={(e, v) => {
                  particleColor = v;
                  setParticleColorState(v);
                }}
                min={0}
                max={360}
                step={1}
                defaultValue={0}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Blob Color',
          control: (
            <>
              <ListItemText>Blob Color (HSB)</ListItemText>
              <Slider
                value={blobColorState}
                onChange={(e, v) => {
                  blobColor = v;
                  setBlobColorState(v);
                }}
                min={0}
                max={360}
                step={1}
                defaultValue={0}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Index>
  );
};

export default MouseFollow;
