import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Cry from '../components/Cry';
import Loader from '../components/Loader';
import { activate as activateAPI } from '../services/fluffy-broccoli/index';
import useRequest from '../hooks/useRequest';

const ActivatePage = () => {
  const { uid, token } = useParams();
  const activate = useRequest(activateAPI);
  const navigate = useNavigate();
  const [error, setError] = useState();
  useEffect(() => {
    activate({ uid, token })
      .then((res) => {
        navigate('/signin?activateSuccess');
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError(err?.response?.data);
      });
  }, [activate, navigate, token, uid]);

  console.log(uid, token);
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen p-4'>
      {error ? (
        <Cry message='Скорее всего аккаунт уже был активирован или Вы перешли по недействительной ссылке' />
      ) : (
        <>
          <Loader />
          Активируем аккаунт...
        </>
      )}
    </div>
  );
};

export default ActivatePage;
