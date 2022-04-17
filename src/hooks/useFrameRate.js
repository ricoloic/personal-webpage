import { useRef, useState } from 'react';

const useFrameRate = () => {
  const frameRateInTime = useRef([]);
  const timeInMilli = useRef(0);
  const [interval, setSetInterval] = useState(null);

  const init = (sketch) => {
    const int = setInterval(() => {
      const timeInSec = `${(timeInMilli.current / 1000).toString()}sec`;
      const frameRate = sketch.frameRate();
      const displayFrameRate = frameRate.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      frameRateInTime.current.push({
        name: timeInSec, pv: displayFrameRate, uv: displayFrameRate, amt: 60,
      });
      if (frameRateInTime.current.length > 5) {
        frameRateInTime.current.splice(0, 1);
      } else {
        // console.table(framerateInTime.current);
      }
      timeInMilli.current += 1000;
    }, 1000);
    setSetInterval(int);
  };

  const reset = () => {
    frameRateInTime.current = [];
    timeInMilli.current = 0;
    clearInterval(interval);
  };

  return { init, reset, frameRateInTime: frameRateInTime.current };
};

export default useFrameRate;
