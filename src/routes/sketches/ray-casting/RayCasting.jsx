import React from 'react';
import P5 from 'p5';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import Layout from '../../../components/layout';
import { Caster } from './caster';
import { BoxBoundary } from './boxBoundary';
import { Point } from './point';

let boundaries = [];
let centerPos = null;
let caster = null;
let editing = false;
let autoMove = false;

const getSidesBoundaries = (p, thickness = 0) => {
  const w = p.width - 1;
  const h = p.height - 1;
  return new BoxBoundary(
    p,
    new Point(p, 1, 1),
    new Point(p, w, 1),
    new Point(p, w, h),
    new Point(p, 1, h),
    p.color(255),
    thickness,
  );
};

const predefinedBoxes = [
  {
    pt1: { x: 0, y: 0 },
    pt2: { x: 160, y: 80 },
    pt3: { x: 140, y: 200 },
    pt4: { x: 0, y: 140 },
  },
];

const createB = (p) => {
  const makeV = (x, y) => new Point(p, x, y);

  return new BoxBoundary(
    p,
    makeV(predefinedBoxes[0].pt1.x + centerPos.x, predefinedBoxes[0].pt1.y + centerPos.y),
    makeV(predefinedBoxes[0].pt2.x + centerPos.x, predefinedBoxes[0].pt2.y + centerPos.y),
    makeV(predefinedBoxes[0].pt3.x + centerPos.x, predefinedBoxes[0].pt3.y + centerPos.y),
    makeV(predefinedBoxes[0].pt4.x + centerPos.x, predefinedBoxes[0].pt4.y + centerPos.y),
  );
};

const makeSketch = () => new P5((p) => {
  let xoff = 0;
  let yoff = 111111;

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    centerPos.set(p.width / 2, p.height / 2);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    centerPos = p.createVector(p.width / 2, p.height / 2);
    caster = new Caster(p, centerPos);

    boundaries.push(getSidesBoundaries(p));

    boundaries.push(createB(p));
  };

  p.draw = () => {
    p.background(30);

    if (autoMove) {
      caster?.setPos(p.noise(xoff) * p.width, p.noise(yoff) * p.height);
      xoff += 0.01;
      yoff += 0.01;
    } else {
      caster.setPos(p.mouseX, p.mouseY);
    }

    if (!editing) {
      caster.cast(boundaries.map((boundary) => boundary.lines).flat());
    }
    // eslint-disable-next-line for-direction
    boundaries[0].show();
    for (let i = 1; i < boundaries.length; i++) {
      boundaries[i].show(editing);
    }
  };

  const onRelease = () => {
    boundaries.forEach((boundary) => boundary.points.forEach((pt) => {
      pt.moving = false;
    }));
  };

  const onPress = () => {
    boundaries.forEach((boundary) => boundary.points.forEach((pt) => {
      if (pt.hovering) {
        pt.moving = true;
      }
    }));
  };

  p.touchEnded = () => {
    onRelease();
  };

  p.touchStarted = () => {
    onPress();
  };

  p.mouseReleased = () => {
    onRelease();
  };

  p.mousePressed = () => {
    onPress();
  };
});

const RayCasting = function () {
  const [sketch, setSketch] = React.useState(null);
  const [editingBoundaries, setEditingBoundaries] = React.useState(editing);
  const [autoMoveState, setAutoMoveState] = React.useState(autoMove);

  const removeSketch = (s = sketch) => {
    s.remove();
    setSketch(null);
    caster = null;
    boundaries = [];
    editing = false;
    setEditingBoundaries(false);
  };

  React.useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => removeSketch(newSketch);
  }, []);

  const handleRefresh = () => {
    removeSketch();
    setSketch(makeSketch());
  };

  const handleEditingBoundariesChange = () => {
    editing = !editing;
    setEditingBoundaries(editing);
  };

  const handleAddBoxBoundary = () => {
    boundaries.push(createB(sketch));
    if (!editing) {
      handleEditingBoundariesChange();
    }
  };

  const handleAutoMoveChange = () => {
    autoMove = !autoMove;
    setAutoMoveState(autoMove);
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      sketchDescription={`
        Ray Casting is a technique for detecting collisions between a ray and a set of polygons.
        The ray is defined by a starting point and a direction.
        The polygons are defined by a set of points.
        The ray is cast against the polygons and the closest collision is returned.
        The position of the rays are based on mouse position by default.
        The rays can be moved automatically with perlin noise, see the settings icon.
        The points of each polygons can also be edited, see the settings icon.
      `}
      controls={[
        {
          key: 'Add Box Boundary',
          control: (
            <Button
              variant="contained"
              component="label"
              fullWidth
              color="primary"
              onClick={handleAddBoxBoundary}
            >
              Add Box Boundary
            </Button>
          ),
        },
        {
          key: 'Edit Boundaries',
          control: (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={editingBoundaries}
                  onChange={handleEditingBoundariesChange}
                  name="editingBoundaries"
                />
              )}
              label="Edit Boundaries"
            />
          ),
        },
        {
          key: 'Auto Movement',
          control: (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={autoMoveState}
                  onChange={handleAutoMoveChange}
                  name="autoMove"
                />
              )}
              label="Auto Movement"
            />
          ),
        },
      ]}
    >
      <div className="sketch-container" id="parent" />
    </Layout>
  );
};

export default RayCasting;
