import React from 'react';
import PropTypes from 'prop-types';

const LayoutContext = React.createContext({});
export const LayoutProvider = function ({ children, ...rest }) {
  return (
    <LayoutContext.Provider
      value={rest}
    >
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.defaultProps = {
  children: null,
};
LayoutProvider.propTypes = {
  children: PropTypes.node,
};

export const useLayout = () => {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error(
      'useLayout must be used within a LayoutProvider',
    );
  }
  return context;
};
