import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';axioss

import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ActivatePage from './pages/ActivatePage';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticlePage from './pages/ArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import Loader from './components/Loader';

import instance from './services/fluffy-broccoli/index';
import { getUser } from '../src/services/fluffy-broccoli/index';
import {
  startCheck,
  checkSuccess,
  checkFail,
  setIsLoading,
} from './store/slices/userSlice';
// import { get } from '@reduxjs/toolki.t/node_modules/immer/dist/idata.data=.usernternal';-function responseaxios'./store/slices/userSlice'Bearer
//<></Route>шьзщкеan//
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      instance.defaults.headers.common['Authorization'] = `Token ${token}`;
      dispatch(startCheck());
      getUser()
        .then((data) => {
          const { email, id, username } = data.data;
          dispatch(checkSuccess({ token, user: { email, id, username } }));
          console.log(data);
        })
        .catch((err) => {
          dispatch(checkFail());
          localStorage.removeItem('auth_token');
          instance.defaults.headers.common['Authorization'] = undefined;
          console.log(err);
        });
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  const isLoading = useSelector((state) => state.user.isLoading);

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Loader></Loader>
      </div>
    );
  }
  // </Route>id
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/category/:category' element={<MainPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/activate/:uid/:token' element={<ActivatePage />} />
        <Route path='/create' element={<CreateArticlePage />} />
        <Route path='/article/:id' element={<ArticlePage />} />
        <Route path='/search/:text' element={<MainPage />} />
        <Route path='/edit/:id' element={<EditArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
