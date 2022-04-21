import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Card } from './card';
import useSketchCardsStyles from './useSketchCardsStyles';
import { SKETCHES_ROUTES } from '../../constants';
import { useSearchContext } from '../contexts/SearchContext';

export const SketchesCards = function () {
  const classes = useSketchCardsStyles();
  const { search } = useSearchContext();
  const [sketches, setSketches] = useState([]);
  const [filteredSketches, setFilteredSketches] = useState([]);

  useEffect(() => {
    setFilteredSketches(sketches.filter(({
      parsedkey, title, isActive, show,
    }) => {
      if (!isActive) return false;
      if (search) return parsedkey.includes(search) || title.toLowerCase().includes(search);
      return show;
    }));
  }, [search, sketches]);

  useEffect(() => {
    const sketchesRoutes = Object.entries(SKETCHES_ROUTES);
    const importAll = (context) => context.keys().map(context);
    const list = importAll(
      require.context('../../../images/previews', false, /\.(png)$/),
    );

    const parsedSketches = sketchesRoutes.map(
      ([key, sketchInfo]) => ({
        key,
        parsedkey: key.replace(/-/g, ' '),
        image: list.find((image) => image.includes(key)),
        ...sketchInfo,
      }),
    );
    setSketches(parsedSketches);
  }, []);

  return (
    <Grid item xs={12}>
      <main className={!search ? classes.container : classes.container2}>
        {sketches.length === 0 ? (
          <>
            <Skeleton variant="rect" height={300} />
            <Skeleton variant="rect" height={300} />
            <Skeleton variant="rect" height={300} />
            <Skeleton variant="rect" height={300} />
            <Skeleton variant="rect" height={300} />
            <Skeleton variant="rect" height={300} />
          </>
        ) : (
          filteredSketches.map(({
            route, title, key, parsedkey, image,
          }) => (
            <Card
              key={key}
              route={route}
              title={title}
              parsedkey={parsedkey}
              image={image}
            />
          ))
        )}
      </main>
    </Grid>
  );
};

export default SketchesCards;
