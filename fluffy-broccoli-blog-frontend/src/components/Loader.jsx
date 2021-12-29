import React from 'react';
import logo from '../images/logo.jpg';

const Loader = ({ borderColor = 'black' }) => {
  return (
    <img
      src={logo}
      alt='loader'
      className='animate-spin'
      style={{ transformOrigin: '50% 100%' }}
    ></img>
  );
};

export default Loader;
