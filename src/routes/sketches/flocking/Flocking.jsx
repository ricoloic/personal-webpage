import React, { useEffect } from 'react';
import P5 from 'p5';
import Layout from '../../../Layout';
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
    // quadTree.show(p);

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
  const separationRef = React.useRef(null);
  const [isLooping, setIsLooping] = useLooping(sketch);

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

  const handleBoidAmountChange = ({ target: { value } }) => {
    setBoidAmount(value);
    handleRefresh();
  };

  const handleSeparationForceChange = ({ target: { value } }) => {
    separationForce = parseFloat(value);
    setSeparationValue(value);
  };

  return (
    <Layout
      isLooping={isLooping}
      handleLooping={setIsLooping}
      handleRefresh={handleRefresh}
      rightComponent={(
        <>
          <label htmlFor="separation-force" type="range">
            Separation Force
            {' '}
            {separationValue}
            <input
              id="separation-separation-force"
              type="range"
              defaultValue={separationForce}
              step={0.01}
              min="1"
              max="10"
              ref={separationRef}
              onChange={handleSeparationForceChange}
            />
          </label>
          <label htmlFor="boid-amount" type="range">
            Boid Amount
            {' '}
            {boidAmount}
            <input
              id="boid-amount"
              type="range"
              min="50"
              max="500"
              value={boidAmount}
              onChange={handleBoidAmountChange}
            />
          </label>
        </>
      )}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default Flocking;
