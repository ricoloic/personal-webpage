/* eslint-disable no-trailing-spaces */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutProvider } from './providers/LayoutProvider';
import Navbar from './sketch-navigation/navbar';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const Layout = function ({
  children,
  sketchDescription,
  handleRefresh,
  handleSave,
  handleLooping,
  isLooping,
  controls,
}) {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 1);
    const html = document.body.parentNode;
    html.className = 'no-move';

    return () => {
      html.className = '';
    };
  }, []); 

  return (
    <LayoutProvider
      {...{
        sketchDescription,
        handleRefresh,
        handleSave,
        handleLooping,
        isLooping,
        controls,
      }}
    >
      <div className={classes.root}>
        <Navbar />
        { children }
      </div>
    </LayoutProvider>
  );
};

export default Layout;

Layout.defaultProps = {
  controls: null,
  sketchDescription: null,
  handleRefresh: null,
  handleSave: null,
  handleLooping: null,
  isLooping: true,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sketchDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  controls: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    control: PropTypes.node.isRequired,
  })),
  handleRefresh: PropTypes.func,
  handleSave: PropTypes.func,
  handleLooping: PropTypes.func,
  isLooping: PropTypes.bool,
};
