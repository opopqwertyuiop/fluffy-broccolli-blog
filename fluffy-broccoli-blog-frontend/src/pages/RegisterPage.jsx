import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Field from '../components/Field';
import Button from '../components/Button';
import { register as registerAPI } from '../services/fluffy-broccoli';
import useInput from '../hooks/useInput';
import useRequest from '../hooks/useRequest';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  useAuth(false);
  const register = useRequest(registerAPI);

  const nameInput = useInput('');
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const re_passwordInput = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const username = nameInput.value,
      email = emailInput.value,
      password = passwordInput.value,
      re_password = re_passwordInput.value;

    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      re_password.trim() === ''
    ) {
      return;
    }
    setIsLoading(true);
    register({ username, email, password, re_password })
      .then((res) => {
        navigate('/signin?registerSuccess');
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setIsLoading(false);
        setErrors(err?.response?.data);
      });
  };

  return (
    <div className='flex w-full min-h-screen items-center justify-center p-4'>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-md border p-4 shadow-md'
      >
        <h3 className='text-center text-xl'>Регистрация</h3>
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
          label={'Эл. почта'}
          name='email'
          input={emailInput}
          isDisabled={isLoading}
          type='email'
        />
        <Field
          errors={errors}
          label={'Пароль'}
          name='password'
          input={passwordInput}
          isDisabled={isLoading}
          type='password'
        />
        <Field
          errors={errors}
          label={'Пароль ещё раз'}
          name='re_password'
          input={re_passwordInput}
          isDisabled={isLoading}
          type='password'
        />
        <Button isLoading={isLoading}>Зарегистрироваться</Button>
        <Link to='/signin'>Войти</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
