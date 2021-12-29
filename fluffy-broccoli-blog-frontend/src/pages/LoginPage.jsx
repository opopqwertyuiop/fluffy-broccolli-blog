import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Field from '../components/Field';
import Button from '../components/Button';
import instance, {
  login as loginAPI,
  getUser as getUserAPI,
} from '../services/fluffy-broccoli';
import useInput from '../hooks/useInput';
import useRequest from '../hooks/useRequest';
import useQuery from '../hooks/useQuery';
import { login as loginAction } from '../store/slices/userSlice';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();

  useAuth(false);

  const dispatch = useDispatch();

  const query = useQuery();

  const login = useRequest(loginAPI);
  console.log(login);
  const getUser = useRequest(getUserAPI);

  const nameInput = useInput('');
  const passwordInput = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const username = nameInput.value,
      password = passwordInput.value;

    if (username.trim() === '' || password.trim() === '') {
      return;
    }
    setIsLoading(true);
    login({ username, password })
      .then((res) => {
        localStorage.setItem('auth_token', res.data.auth_token);
        instance.defaults.headers.common[
          'Authorization'
        ] = `Token ${res.data.auth_token}`;
        return getUser();
      })
      .then((res) => {
        const { email, id, username } = res.data;
        dispatch(
          loginAction({
            user: { email, id, username },
            token: localStorage.getItem('auth_token'),
          })
        );
        navigate('/');
      })
      .catch((err) => {
        instance.defaults.headers.common['Authorization'] = undefined;
        if (axios.isCancel(err)) {
          return;
        }
        setIsLoading(false);
        setErrors(err?.response?.data);
      });
  };

  const registerSuccess = query.get('registerSuccess');
  const activateSuccess = query.get('activateSuccess');
  return (
    <div className='flex w-full min-h-screen items-center justify-center p-4'>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-md border p-4 shadow-md'
      >
        {registerSuccess === '' && (
          <div
            className='bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md'
            role='alert'
          >
            <div className='flex'>
              <div className='py-1'>
                <svg
                  className='fill-current h-6 w-6 text-green-500 mr-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
                </svg>
              </div>
              <div>
                <p className='font-bold'>Вы успешно зарегистрировались!</p>
                <p className='text-sm'>
                  Прежде чем Вы сможете войти, активируйте аккаунт, перейдя по
                  ссылке, которую мы отправили Вам на электронную почту.
                </p>
              </div>
            </div>
          </div>
        )}
        {activateSuccess === '' && (
          <div
            class='bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md'
            role='alert'
          >
            <div className='flex'>
              <div className='py-1'>
                <svg
                  className='fill-current h-6 w-6 text-green-500 mr-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
                </svg>
              </div>
              <div>
                <p className='font-bold'>Ваш аккаунт активирован!</p>
                <p className='text-sm'>Теперь Вы можете войти.</p>
              </div>
            </div>
          </div>
        )}
        <h3 className='text-center text-xl mt-4'>Авторизация</h3>
        {errors && errors['non_field_errors'] && (
          <ul>
            {errors['non_field_errors'].map((error) => (
              <li className='text-red-600 text-sm'>{error}</li>
            ))}
          </ul>
        )}
        <Field
          errors={errors}
          label={'Имя пользователя'}
          name='username'
          input={nameInput}
          isDisabled={isLoading}
        />
        <Field
          errors={errors}
          label={'Пароль'}
          name='password'
          input={passwordInput}
          isDisabled={isLoading}
          type='password'
        />
        <Button isLoading={isLoading}>Войти</Button>
        <Link to='/signun'>Зарегистрироваться</Link>
      </form>
    </div>
  );
};

export default LoginPage;
