import React, { useEffect, useMemo } from 'react';
import P5 from 'p5';
import {
  Box,
  FormControl, ListItemText, MenuItem, Select, Slider,
} from '@material-ui/core';
import {
  Line, LineChart, Tooltip, XAxis, YAxis,
} from 'recharts';
import Layout from '../../../components/layout';
import { Firework } from './firework';
import sparksColor from './sparksColor';
import { capitalizeFirstLetter } from '../utils';
import useFrameRate from '../../../hooks/useFrameRate';

let fireworks = [];
let gravity = null;
let sparksGravity = null;
let fireworkAmount = 20;
let sparkAmount = 40;
let selectedSparksColor = sparksColor.vibrant;
const margin = {
  top: 20,
  right: 70,
  bottom: 0,
  left: 0,
};

const Fireworks = function () {
  const [sketch, setSketch] = React.useState(null);
  const [isLooping, setIsLooping] = React.useState(true);
  const [fireworkAmountState, setFireworkAmountState] = React.useState(fireworkAmount);
  const [sparkAmountState, setSparkAmountState] = React.useState(sparkAmount);
  const [selectedSparksColorState, setSelectedSparksColorState] = React.useState('vibrant');
  const { init, reset, frameRateInTime } = useFrameRate();

  const createFirework = (p) => {
    const position = p.createVector(p.random(0, p.width), p.height);
    const color = Array.isArray(selectedSparksColor) ? p.random(selectedSparksColor) : undefined;
    const firework = new Firework(p, position, sparkAmount, color);
    firework.applyForce(p.createVector(0, p.random(-10, -12)));
    return firework;
  };

  const makeSketch = useMemo(() => (() => new P5((p) => {
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.setup = () => {
      p.pixelDensity(1);
      p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

      init(p);
      gravity = p.createVector(0, 0.1);
      sparksGravity = p.createVector(0, 0.02);
      for (let i = 0; i < fireworkAmount; i++) {
        setTimeout(
          // eslint-disable-next-line no-loop-func
          () => fireworks.push(createFirework(p)),
          i * 200,
        );
      }
    };

    p.draw = () => {
      p.background(0);
      fireworks.forEach((firework) => {
        if (firework.isGoingDown() && !firework.exploded) { firework.explode(p.random(selectedSparksColor)); }
        if (firework.finished) { firework.reset(); }
        firework.applyForce(firework.exploded ? sparksGravity : gravity);
        firework.update();
        firework.show();
      });
      // console.log(p.floor(p.frameRate()));
    };
  })), []);

  const removeSketch = (s = sketch) => {
    if (s) s.remove();
    fireworks = [];
  };

  useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);

    return () => {
      removeSketch(newSketch);
      reset();
    };
  }, []);

  const handleRefresh = () => {
    removeSketch();

    const newSketch = makeSketch();
    setSketch(newSketch);
    setIsLooping(true);
  };

  const handleLooping = () => {
    setIsLooping(!isLooping);
    if (isLooping) sketch.noLoop();
    else sketch.loop();
  };

  const handleFireworksAmountChange = (v) => {
    setFireworkAmountState(v);
    fireworkAmount = v;

    const offsetAmount = fireworkAmount - fireworks.length;
    if (offsetAmount > 0) {
      for (let i = 0; i < offsetAmount; i++) {
        fireworks.push(createFirework(sketch));
      }
    } else if (offsetAmount < 0) {
      for (let i = 0; i < Math.abs(offsetAmount); i++) {
        fireworks.pop();
      }
    }
  };

  const handleSparksAmountChange = (v) => {
    setSparkAmountState(v);
    sparkAmount = v;
    fireworks.forEach((firework) => {
      firework.sparkAmount = v;
    });
  };

  const handleSparksColorChange = ({ target: { value } }) => {
    setSelectedSparksColorState(value);
    selectedSparksColor = sparksColor[value];
  };

  return (
    <Layout
      isLooping={isLooping}
      handleLooping={handleLooping}
      handleRefresh={handleRefresh}
      controls={[
        {
          key: 'Graph',
          control: (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <LineChart width={300} height={200} data={frameRateInTime} margin={margin} syncId="test">
                <Line isAnimationActive={false} type="monotone" dataKey="uv" stroke="#ff7300" />
                <Tooltip />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </Box>
          ),
        },
        {
          key: 'Sparks Color',
          control: (
            <FormControl fullWidth>
              <ListItemText>
                Sparks Color
              </ListItemText>
              <Select
                labelId="color-label"
                id="color-select"
                value={selectedSparksColorState}
                onChange={handleSparksColorChange}
                variant="outlined"
                size="small"
              >
                {Object.keys(sparksColor).map((color) => (
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
          key: 'Fireworks Amount',
          control: (
            <>
              <ListItemText>Fireworks Amount</ListItemText>
              <Slider
                value={fireworkAmountState}
                min={1}
                max={30}
                step={1}
                onChange={(e, v) => handleFireworksAmountChange(v)}
                defaultValue={10}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Sparks Amount',
          control: (
            <>
              <ListItemText>Sparks Amount</ListItemText>
              <Slider
                value={sparkAmountState}
                min={10}
                max={100}
                step={1}
                onChange={(e, v) => handleSparksAmountChange(v)}
                defaultValue={30}
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

export default Fireworks;
