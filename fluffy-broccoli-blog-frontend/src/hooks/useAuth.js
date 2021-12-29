import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = (restricted = true) => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (restricted && !isAuth) {
      navigate('/signin');
    }
    if (!restricted && isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate, restricted]);
};

export default useAuth;
