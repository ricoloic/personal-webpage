import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    gap: '1rem',
    backgroundColor: '#fff',
    width: '276px',
    height: '100%',
  },
  colorPicker: {
    width: '276px',
    backgroundColor: 'rgb(255, 255, 255) !important',
    border: '0px solid rgba(0, 0, 0, 0.25)',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 4px',
    borderRadius: '4px',
    position: 'relative',
    padding: '1rem',
    overflow: 'hidden',
    '& p': {
      width: '100%',
      textAlign: 'center',
      margin: '0',
      borderBottom: 'solid 1px #000000',
    },
    '& label': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  colorPickerDisplayColor: {
    borderRadius: '4px',
    width: '100%',
    height: '100%',
    minHeight: '100px',
    backgroundColor: (props) => props.backgroundColor,
  },
  input: {
    width: '57px',
    height: '100%',
    border: '0px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    padding: '0.5rem',
    '&:focus': {
      border: '0px',
    },
  },
  icon: {
    color: '#000',
  },
  pointer: {
    transform: 'translate(-50%, -10px)',
    cursor: 'pointer',
    fontSize: 16,
    '& svg': {
      fill: '#fff',
    },
  },
  colorPickerVisibility: {
    height: 'min-content',
    flexWrap: 'nowrap',
    gap: '1rem',
    '& button': {
      padding: '0px',
      margin: '5px',
    },
    '& > .MuiGrid-root': {
      padding: '0',
      width: 'unset',
      minWidth: 'fit-content',
    },
    '& > div': {
      '& > div': {
        '& > div': {
          margin: '0 !important',
        },
      },
    },
  },
  padding_1: {
    padding: '0.1rem 0.5rem 0.1rem 0.1rem !important',
  },
  width_100: {
    width: '100% !important',
  },
  height_34: {
    height: '34px !important',
  },
  noSelect: {
    userSelect: 'none',
    '& *': {
      userSelect: 'none',
    },
  },
});

export default useStyles;
