import { useEffect, useState } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;

// const isDesktop = useMediaQuery('(min-width: 960px)');
// const isBigScreen = useMediaQuery('(min-width: 1824px)');

/* iPads (portrait) ----------- */
// const isTabletPortraitMin = useMediaQuery('(min-width: 768px)');
// const isTabletPortraitMax = useMediaQuery('(max-width: 1024px)');
// const isPortrait = useMediaQuery('(orientation: portrait)');
