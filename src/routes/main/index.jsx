import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { SketchesCards } from './sketch-navigation/SketchesCards';
import { AboutMe } from './about/AboutMe';
import { AboutSite } from './about/AboutSite';

const Main = function () {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <AboutMe />
      <AboutSite />
      <SketchesCards />
    </Grid>
  );
};

export default Main;
