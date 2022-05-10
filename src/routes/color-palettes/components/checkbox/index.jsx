/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, Checkbox as MuiCheckbox } from '@material-ui/core';
import useColorPickerStyles from '../colorPicker/index.styles';

function Checkbox({
  name,
  label,
  checked,
  onChange,
  disabled,
}) {
  const classes = useColorPickerStyles();
  return (
    <Grid item container wrap="nowrap" alignItems="center" className={`${classes.colorPicker} ${classes.padding_1}`}>
      <MuiCheckbox
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <Tooltip title={label}>
        <label>
          {label}
        </label>
      </Tooltip>
    </Grid>
  );
}

Checkbox.defaultProps = {
  disabled: false,
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;
