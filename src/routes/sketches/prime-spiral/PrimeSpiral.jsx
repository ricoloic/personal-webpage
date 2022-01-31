import React from 'react';
import P5 from 'p5';
import { ListItemText, Slider } from '@material-ui/core';
import Layout from '../../../components/layout';
import primes from './primes';

let pointAmount = 30000;
let scale = 0.004;
let strokeWeight = 500;

const makeSketch = () => new P5((p) => {
  const drawSpiral = () => {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.scale(scale);
    p.strokeWeight(strokeWeight);
    p.noFill();
    p.stroke(255, 255, 0);
    const max = p.min(pointAmount, primes.length);
    for (let i = 0; i < max; i++) {
      const prime = primes[i];
      const x = p.cos(prime) * prime;
      const y = p.sin(prime) * prime;
      p.point(x, y);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    drawSpiral();
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    drawSpiral();
  };
});

const PrimeSpiral = function () {
  const [sketch, setSketch] = React.useState(null);
  const [pointAmountState, setPointAmountState] = React.useState(pointAmount);
  const [scaleState, setScaleState] = React.useState(scale);
  const [strokeWeightState, setStrokeWeightState] = React.useState(strokeWeight);

  const removeSketch = (s = sketch) => {
    s.remove();
  };

  React.useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => removeSketch(newSketch);
  }, []);

  const handleRefresh = () => {
    removeSketch(sketch);
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handlePointAmountChange = (v) => {
    pointAmount = v;
    setPointAmountState(v);
    handleRefresh();
  };

  const handleScaleChange = (v) => {
    scale = v;
    setScaleState(v);
    handleRefresh();
  };

  const handleStrokeWeightChange = (v) => {
    strokeWeight = v;
    setStrokeWeightState(v);
    handleRefresh();
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      controls={[
        {
          key: 'Point Amount',
          control: (
            <>
              <ListItemText>Point Amount</ListItemText>
              <Slider
                name="pointAmount"
                value={pointAmountState}
                onChange={(e, v) => handlePointAmountChange(v)}
                min={1000}
                max={primes.length}
                step={1000}
                defaultValue={10}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Stroke Weight',
          control: (
            <>
              <ListItemText>Stroke Weight</ListItemText>
              <Slider
                name="strokeWeight"
                value={strokeWeightState}
                onChange={(e, v) => handleStrokeWeightChange(v)}
                min={100}
                max={1000}
                step={100}
                defaultValue={500}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Scale',
          control: (
            <>
              <ListItemText>Scale</ListItemText>
              <Slider
                name="scale"
                value={scaleState}
                onChange={(e, v) => handleScaleChange(v)}
                min={0.001}
                max={0.05}
                step={0.001}
                defaultValue={0.001}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
      ]}
    >
      <div className="sketch-container" id="parent" />
    </Layout>
  );
};

export default PrimeSpiral;
