import React from 'react';
import { Link } from 'react-router-dom';

import cry from '../images/cry.jpg';

const Cry = ({ message }) => {
  return (
    <>
      <span className='text-2xl mb-4'>Что-то пошло не так</span>
      <img width='300' height='300' src={cry} alt='cry broccoli' />

      <p className='text-lg mt-4'>{message}</p>
      <Link to='/'>На главную</Link>
    </>
  );
};

export default Cry;
