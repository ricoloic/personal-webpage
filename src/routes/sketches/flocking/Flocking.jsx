import React, { useEffect } from 'react';
import P5 from 'p5';
import {
  Checkbox, FormControlLabel, ListItemText, Slider,
} from '@material-ui/core';
import Index from '../../../components/layout';
import Rectangle from './quadtree/rectangle';
import Boid from './boid';
import QuadTree from './quadtree/quadtree';
import Point from './quadtree/point';
import Circle from './quadtree/circle';
import { useLooping } from '../utils';

let boundary = null;
let boids = [];
let theOne = null;
let quadTree = null;
let alignmentForce = 0.5;
let cohesionForce = 0.2;
let separationForce = 4.3;
let displayQuadTree = false;

const makeSketch = (boidAmount) => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    boundary = new Rectangle(p.width / 2, p.height / 2, p.width, p.height);

    for (let i = 0; i < boidAmount; i++) boids.push(new Boid(p));
    theOne = new Boid(p);
  };

  p.draw = () => {
    p.background(30);

    quadTree = new QuadTree(boundary, 4);
    // eslint-disable-next-line no-restricted-syntax
    for (const boid of boids) {
      quadTree.insert(new Point(boid.pos.x, boid.pos.y, boid));
    }
    if (displayQuadTree) quadTree.show(p);

    const tempBoids = [...boids];
    // eslint-disable-next-line no-restricted-syntax
    for (const boid of boids) {
      const range = new Circle(boid.pos.x, boid.pos.y, 50);
      const points = quadTree.query(range);

      boid.flock(
        points.map((point) => point.userData),
        false,
        {
          alignmentForce,
          cohesionForce,
          separationForce,
        },
      );
    }
    theOne.flock(tempBoids, true, {
      alignmentForce,
      cohesionForce,
      separationForce,
    });
  };
});

const Flocking = function () {
  const [sketch, setSketch] = React.useState(null);
  const [boidAmount, setBoidAmount] = React.useState(250);
  const [separationValue, setSeparationValue] = React.useState(4.3);
  const [isLooping, setIsLooping] = useLooping(sketch);
  const [displayQuadTreeState, setDisplayQuadTreeState] = React.useState(displayQuadTree);

  useEffect(() => {
    const newSketch = makeSketch(boidAmount);

    setSketch(newSketch);

    return () => {
      boundary = null;
      boids = [];
      theOne = null;
      quadTree = null;
      alignmentForce = 0.5;
      cohesionForce = 0.2;
      separationForce = 4.3;
      newSketch.remove();
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    boundary = null;
    boids = [];
    theOne = null;
    quadTree = null;
    const newSketch = makeSketch(boidAmount);
    setSketch(newSketch);
  };

  const handleBoidAmountChange = (v) => {
    setBoidAmount(v);
    handleRefresh();
  };

  const handleSeparationForceChange = (v) => {
    separationForce = v;
    setSeparationValue(v);
  };

  const handleDisplayQuadTreeChange = () => {
    displayQuadTree = !displayQuadTree;
    setDisplayQuadTreeState(displayQuadTree);
  };

  return (
    <Index
      isLooping={isLooping}
      handleLooping={setIsLooping}
      handleRefresh={handleRefresh}
      sketchDescription={`
        This is a simulation of flocking behavior.
        The boids will try to stay close to each other, avoid each other and try to go in the direction.
        The separation force is the distance at which the boids will try to keep a minimum distance from each other.
        You change the amount of boids and some of the forces to see how it affects the behavior.
      `}
      controls={[
        {
          key: 'Display QuadTree',
          control: (
            <FormControlLabel
              label={<ListItemText>Display QuadTree</ListItemText>}
              control={(
                <Checkbox
                  checked={displayQuadTreeState}
                  onChange={handleDisplayQuadTreeChange}
                />
              )}
            />
          ),
        },
        {
          key: 'Separation Force',
          control: (
            <>
              <ListItemText>Separation Force</ListItemText>
              <Slider
                value={separationValue}
                onChange={(e, v) => handleSeparationForceChange(v)}
                min={1}
                max={10}
                step={0.01}
                defaultValue={4.3}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Boid Amount',
          control: (
            <>
              <ListItemText>Boid Amount</ListItemText>
              <Slider
                value={boidAmount}
                onChange={(e, v) => handleBoidAmountChange(v)}
                min={50}
                max={500}
                defaultValue={250}
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

export default Flocking;
