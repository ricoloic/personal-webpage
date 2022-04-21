import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { SketchesCards } from './sketch-navigation/SketchesCards';
import { AboutMe } from './about/AboutMe';
import { AboutSite } from './about/AboutSite';
import { SearchProvider } from './contexts/SearchContext';

const Main = function () {
  return (
    <SearchProvider>
      <Grid container justifyContent="center" alignItems="center">
        <AboutMe />
        <AboutSite />
        <SketchesCards />
      </Grid>
    </SearchProvider>
  );
};

export default Main;
