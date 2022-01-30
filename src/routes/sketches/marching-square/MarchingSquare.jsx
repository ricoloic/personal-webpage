import React from 'react';
import P5 from 'p5';
import {
  Checkbox, FormControlLabel, ListItemText, Slider,
} from '@material-ui/core';
import Layout from '../../../components/layout';
import { drawContourBasedOnState, getMiddles, getState } from './utils';

let isMovingTime = false;
let isShowingPoint = false;

let isMoving = false;
let lastMousePosition = {
  x: 0,
  y: 0,
};
let scl = 30;
const noiseScale = 0.002;
const timeInc = 0.001;
let grid = null;
let rows = null;
let cols = null;
let zoff = 0;

const startMoving = () => {
  isMoving = true;
};

const stopMoving = () => {
  isMoving = false;
};

const makeSketch = () => new P5((p) => {
  const forSpotInGrid = (action) => {
    const position = lastMousePosition;
    if (isMoving) {
      position.x = p.mouseX;
      position.y = p.mouseY;
    }

    for (let i = 0; i < grid.length - 1; i++) {
      for (let j = 0; j < grid[i].length - 1; j++) {
        const x = i * scl;
        const y = j * scl;

        const n = p.noise(
          (position.x + x) * noiseScale,
          (position.y + y) * noiseScale,
          zoff,
        );
        grid[i][j] = n > 0.5 ? 1 : 0;
        action({
          i, j, x, y,
        });
      }
    }
    if (isMovingTime) zoff += timeInc;
  };

  p.resizeWindow = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    p.pixelDensity(1);
    // p.noiseSeed(10);
    p.noiseDetail(30);
    p.stroke(255);

    cols = p.floor(p.width / scl) + 2;
    rows = p.floor(p.height / scl) + 2;

    grid = [];
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
      for (let j = 0; j < rows; j++) {
        grid[i][j] = p.random(1);
      }
    }
  };

  p.draw = () => {
    p.background(120);

    forSpotInGrid(({
      i, j, x, y,
    }) => {
      const middles = getMiddles(scl, x, y);
      const state = getState(grid, i, j);
      p.stroke(255);
      p.strokeWeight(1);
      drawContourBasedOnState(p, state, middles);

      if (isShowingPoint && grid[i][j]) {
        p.strokeWeight(4);
        p.point(x, y);
      }
    });
  };

  p.touchEnded = () => stopMoving();
  p.touchStarted = () => startMoving();
  p.mouseReleased = () => stopMoving();
  p.mousePressed = () => startMoving();
});

const MarchingSquare = function () {
  const [sketch, setSketch] = React.useState(null);
  const [isMovingTimeState, setIsMovingTimeState] = React.useState(isMovingTime);
  const [isShowingPointState, setIsShowingPointState] = React.useState(isShowingPoint);
  const [scaleState, setScaleState] = React.useState(scl);

  const removeSketch = (s = sketch) => {
    if (s) {
      s.remove();
      grid = null;
      rows = null;
      cols = null;
    }
  };

  React.useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => {
      removeSketch(newSketch);
    };
  }, []);

  const handleRefresh = () => {
    removeSketch();
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleMoveTimeChange = () => {
    isMovingTime = !isMovingTime;
    setIsMovingTimeState(isMovingTime);
    if (isMovingTime) {
      lastMousePosition = { x: sketch.mouseX, y: sketch.mouseY };
    }
  };

  const handleShowPointChange = () => {
    isShowingPoint = !isShowingPoint;
    setIsShowingPointState(isShowingPoint);
  };

  const handleScaleChange = (v) => {
    scl = v;
    setScaleState(v);
    handleRefresh();
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      sketchDescription={`
        A simple implementation of the marching squares algorithm.
        The algorithm is used to generate contours.
        The algorithm is used in conjunction with a perlin noise map.
        The contours are drawn based on the state of the noise map.
        The scale of the map can be changed by clicking the settings icon.
        You are also able to make the noise map move through time.
        When the map is moving through time you won't be able to move the map.
        You can also show the points of the map.
        The map can be moved by clicking and dragging the mouse.
      `}
      controls={[
        {
          key: 'Scale',
          control: (
            <>
              <ListItemText>Scale</ListItemText>
              <Slider
                name="scale"
                value={scaleState}
                onChange={(e, v) => handleScaleChange(v)}
                min={10}
                max={50}
                step={5}
                defaultValue={20}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Move Through Time',
          control: (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={isMovingTimeState}
                  onChange={handleMoveTimeChange}
                  name="moveTime"
                />
              )}
              label="Move Through Time"
            />
          ),
        },
        {
          key: 'Show Points',
          control: (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={isShowingPointState}
                  onChange={handleShowPointChange}
                  name="showPoints"
                />
              )}
              label="Show Points"
            />
          ),
        },
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default MarchingSquare;
