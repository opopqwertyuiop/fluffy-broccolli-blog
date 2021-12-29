import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import logo from '../images/logo.jpg';
import searchIcon from '../images/search.png';
import Container from './Container';
import { logout } from '../store/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const search = useInput('');

  const onClearClick = () => {
    search.onChange({ target: { value: '' } });
  };

  const onLogoutClick = () => {
    localStorage.removeItem('auth_token');
    dispatch(logout());
  };
  return (
    <header style={{ borderBottom: '1px solid #e3e3e3' }} className='py-3'>
      <Container className='flex'>
        <div className='flex-shrink-0'>
          <Link to='/' className='flex items-center'>
            <span className='md:hidden text-3xl font-bold hover:text-red-400'>
              Fluffy
            </span>
            <img src={logo} width='50' height='56' alt='' />
            <span className='md:hidden text-3xl font-bold hover:text-red-400'>
              Broccoli
            </span>
          </Link>
        </div>
        <div className='flex items-center mx-5 flex-grow relative'>
          <input
            className='h-9 text-lg pl-9 pr-24 rounded-xl w-full bg-gray-100'
            placeholder='Найти...'
            {...search}
            type='text'
          />
          <img
            className='absolute left-2'
            src={searchIcon}
            width='24'
            height='24'
            alt=''
          />
          {search.value.trim() !== '' && (
            <div className='absolute right-0 h-9 flex'>
              <button className='w-9 relative' onClick={onClearClick}>
                <span
                  style={{ height: '1px' }}
                  className='absolute inline-block top-1/2 left-1/2 w-4 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45'
                ></span>
                <span
                  style={{ height: '1px' }}
                  className='absolute inline-block top-1/2 left-1/2 w-4 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 -rotate-45'
                ></span>
              </button>
              <Link
                to={`${'/search/'}${search.value}`}
                className='text-blue-600 pr-4 font-medium flex items-center'
              >
                Найти
              </Link>
            </div>
          )}
        </div>
        <div className='flex items-center'>
          <ul className='flex'>
            {isAuth ? (
              <>
                <li className='mr-4'>
                  <Link
                    className='text-blue-600 font-semibold hover:text-red-400'
                    to='/create'
                  >
                    Создать
                  </Link>
                </li>
                <li className='mr-4'>
                  <button
                    onClick={onLogoutClick}
                    className='text-blue-600 font-semibold hover:text-red-400'
                  >
                    Выйти
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='mr-4'>
                  <Link
                    className='text-blue-600 font-semibold hover:text-red-400'
                    to='/signup'
                  >
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-blue-600 font-semibold hover:text-red-400'
                    to='/signin'
                  >
                    Войти
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;
