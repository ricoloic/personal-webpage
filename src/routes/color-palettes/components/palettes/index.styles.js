import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '276px',
  },
  palettes: {
    flexWrap: 'wrap',
  },
  colorPill: {
    cursor: 'pointer',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '4px',
    margin: '0.5rem',
    boxShadow: ({ highlighted }) => (highlighted ? '0 0 0 2px rgba(0, 0, 0, 1)' : 'none'),
    backgroundColor: ({ color }) => color,
  },
});

export default useStyles;
