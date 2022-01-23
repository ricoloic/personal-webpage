import React from 'react';

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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
