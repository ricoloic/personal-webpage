import React from 'react';
import Layout from '../../../Layout';

// create a functional component called PerlinNoiseGifLoop
// that returns a div with a class of 'sketch-container' and an id of 'parent'
// the div#parent will have a parent component called Layout
const PerlinNoiseGifLoop = function () {
  return (
    <Layout>
      <div className="sketch-container" id="parent" />
    </Layout>
  );
};

export default PerlinNoiseGifLoop;
