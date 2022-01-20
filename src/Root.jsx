import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import loic from './images/photos/loic.webp';
import { Sketches } from './Sketches';

const useStyles = makeStyles({
  self: {
    backgroundColor: '#f4ece6',
    padding: '2rem',
  },
  img: {
    width: '100%',
    maxWidth: '300px',
    aspectRatio: 1,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  name: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
  },
  description: {
    maxWidth: '700px',
    fontSize: '1rem',
    marginLeft: '1rem',
  },
  link: {
    textDecoration: 'underline',
    color: '#000',
    fontWeight: 'bold',
  },
  about: {
    backgroundColor: '#DBCFC4',
  },
  title__about: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    marginBottom: '1rem',
    marginLeft: '1rem',
  },
});

const Root = function () {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid className={classes.self} container item alignItems="center" spacing={2} xs={12}>
        <Grid container item justifyContent="center" xs={12} sm={5} md={4}>
          <img className={classes.img} src={loic} alt="loic rico" />
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <h4 className={classes.name}>
            <a href="https://github.com/ricoloic">Loïc Rico</a>
          </h4>
          <hr />
          <p className={classes.description}>
            Hi, I'm Loïc Rico, a canadian web developer.
            This page is a personal website of mine where I can display my creations.
            I'm currently working at
            {' '}
            <a className={classes.link} href="https://www.codeboxx.biz/">CodeBoxx</a>
            {' '}
            as a full-stack developer.
            I'm passionate about generative art and I love to learn new things.
          </p>
        </Grid>
      </Grid>
      <Grid className={classes.about} container item xs={12}>
        <Grid item xs={12}>
          <h4 className={classes.title__about}>
            About this page
          </h4>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Sketches />
      </Grid>
    </Grid>
  );
};

export default Root;
