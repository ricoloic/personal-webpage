import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLineStyles } from '../styles/line';
import { Link } from '../../link';

const useStyles = makeStyles({
  about: {
    backgroundColor: '#DBCFC4',
    padding: '2rem',
  },
  about__title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    marginBottom: '1rem',
    marginLeft: '0.5rem',
  },
  about__description: {
    maxWidth: '90rem',
    fontSize: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
});

export const AboutSite = function () {
  const classes = useStyles();
  const lineClasses = useLineStyles();
  return (
    <Grid className={classes.about} container item justifyContent="center" xs={12}>
      <Grid item xs={12} lg={10}>
        <h4 className={classes.about__title}>
          About this page
        </h4>
        <hr className={lineClasses.line} />
        <p className={classes.about__description}>
          This page is a personal website of mine where I can display my creations.
          It was build with
          {' '}
          <Link blank href="https://reactjs.org/">React</Link>
          {' '}
          and
          {' '}
          <Link blank href="https://p5js.org/">P5js</Link>
          .
          The source code is available on the
          {' '}
          <Link blank href="https://github.com/ricoloic/personal-webpage/">
            GitHub Repository
          </Link>
          .
          I'm currently working on this page on my free time.
          {' '}
          If you would like to suggest a feature or a bug, feel free to leave a
          {' '}
          <Link blank href="https://github.com/ricoloic/personal-webpage/issues/new">issue</Link>
          {' '}
          on the project repository.
          {' '}
          Before I decided to create this page, I was always finding my self searching for a particular project to show to
          someone.
          {' '}
          {/* eslint-disable-next-line max-len */}
          And more often than not I wasn't even able to start the project since the person I would be showing it to, were
          not setup to run it locally.
          {' '}
          So I decided to build this page to show my creations to people who are interested in my work.
          {' '}
          I hope you enjoy it.
        </p>
      </Grid>
    </Grid>
  );
};

export default AboutSite;
