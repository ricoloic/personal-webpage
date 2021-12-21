import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import BackArrow from './images/back-arrow.svg';

const Layout = function ({ children }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  if (window.location.pathname.includes('/sketches')) {
    return (
      <>
        <div className="navbar">
          <button className="no-btn" type="button" onClick={handleGoBack} onKeyUp={handleGoBack}>
            <img alt="back arrow" src={BackArrow} className="back-arrow" />
          </button>
        </div>
        { children }
      </>
    );
  }
  return children;
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
