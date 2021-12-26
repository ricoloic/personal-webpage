import React from 'react';

export const useLooping = (sketch, isLoop = true) => {
  const [isLooping, setIsLooping] = React.useState(isLoop);
  const handleLooping = () => {
    if (isLooping) sketch.noLoop();
    else sketch.loop();
    setIsLooping(!isLooping);
  };
  return [isLooping, handleLooping];
};

export default useLooping;
