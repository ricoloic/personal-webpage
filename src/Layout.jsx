import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import BackArrow from './images/back-arrow.svg';

const Layout = function ({ children, rightComponent }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="navbar">
        <div className="inside-nav">
          <button className="no-btn" type="button" onClick={handleGoBack} onKeyUp={handleGoBack}>
            <img alt="back arrow" src={BackArrow} className="back-arrow" />
          </button>
          <div className="right-container">
            {rightComponent}
          </div>
        </div>
      </div>
      { children }
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  rightComponent: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  rightComponent: PropTypes.node,
};
