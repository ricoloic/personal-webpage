import React from 'react';
import P5 from 'p5';
import {
  FormControl, ListItemText, MenuItem, Select, Slider,
} from '@material-ui/core';
import Layout from '../../../components/layout';
import { bubbleSort, quickSort } from './sortingFunctions';
import { capitalizeFirstLetter } from '../utils';

let list = null;
let scl = 10;
let speed = 10;
const sortingOptions = [
  'quick',
  'bubble',
];

let selectedSort = 'quick';

const makeSketch = () => new P5((p) => {
  const draw = (index, randomNumber, color = p.color(220, 50, 50)) => {
    p.fill(30);
    p.rect(index * scl, 0, scl, randomNumber);
    p.fill(color);
    p.rect(index * scl, p.height - randomNumber, scl, randomNumber);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    p.pixelDensity(1);
    p.noStroke();
    p.fill(240);

    list = [];
    const listSize = p.floor(p.width / scl);
    for (let i = 0; i < listSize; i += 1) {
      list.push({
        current: 0,
        value: p.random(p.height),
      });
    }

    if (selectedSort === 'quick') {
      const quickSpeed = speed ? p.map(speed, 1, 20, 50, 500) : 0;
      quickSort(list, 0, list.length - 1, quickSpeed);
    } else if (selectedSort === 'bubble') {
      bubbleSort(list, speed);
    }
  };

  p.draw = () => {
    p.background(30);
    list.forEach((elem, index) => {
      let color = p.color(240);
      if (elem.current === 1) {
        color = p.color(220, 50, 50);
      } else if (elem.current === 2) {
        color = p.color(50, 220, 50);
      }
      draw(index, elem.value, color);
    });
  };
});

const Sorting = function () {
  const [sketch, setSketch] = React.useState(null);
  const [selectedSortState, setSelectedSortState] = React.useState(selectedSort);
  const [scale, setScale] = React.useState(scl);
  const [speedState, setSpeedState] = React.useState(speed);

  const removeSketch = (s = sketch) => {
    s.remove();
    list = [];
  };

  React.useEffect(() => {
    const newSketch = makeSketch();
    setSketch(newSketch);
    return () => {
      removeSketch(newSketch);
    };
  }, []);

  const handleRefresh = () => {
    removeSketch(sketch);
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleSortTypeChange = ({ target: { value } }) => {
    selectedSort = value;
    setSelectedSortState(value);
    handleRefresh();
  };

  const handleScaleChange = (v) => {
    scl = v;
    setScale(v);
    handleRefresh();
  };

  const handleSpeedChange = (v) => {
    speed = v;
    setSpeedState(v);
    handleRefresh();
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      controls={[
        {
          key: 'Speed',
          control: (
            <>
              <ListItemText>Speed</ListItemText>
              <Slider
                name="speed"
                value={speedState}
                onChange={(e, v) => handleSpeedChange(v)}
                min={0}
                max={20}
                step={1}
                defaultValue={10}
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
                value={scale}
                onChange={(e, v) => handleScaleChange(v)}
                min={1}
                max={25}
                step={1}
                defaultValue={10}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Sort Type',
          control: (
            <FormControl fullWidth>
              <ListItemText>
                Sort Type
              </ListItemText>
              <Select
                name="sortType"
                labelId="sort-type-label"
                id="sort-type-select"
                value={selectedSortState}
                label="Sort Type"
                onChange={handleSortTypeChange}
                variant="filled"
                size="small"
              >
                {sortingOptions.map((sortingType) => (
                  <MenuItem
                    key={sortingType}
                    value={sortingType}
                  >
                    {capitalizeFirstLetter(sortingType)}
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

export default Sorting;
