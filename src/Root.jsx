import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { SketchesCards } from './components/layout/sketch-navigation/SketchesCards';
import { AboutMe } from './components/layout/main/about/AboutMe';
import { AboutSite } from './components/layout/main/about/AboutSite';

const Root = function () {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <AboutMe />
      <AboutSite />
      <SketchesCards />
    </Grid>
  );
};

export default Root;
