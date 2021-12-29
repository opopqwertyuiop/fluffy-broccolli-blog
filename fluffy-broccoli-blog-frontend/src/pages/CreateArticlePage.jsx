import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import useRequest from '../hooks/useRequest';
import useAuth from '../hooks/useAuth';
import { createArticle as createArticleAPI } from '../services/fluffy-broccoli/index';
import MainLayout from '../layouts/MainLayout';
import TextEditor from '../components/TextEditor';
import Field from '../components/Field';
import Button from '../components/Button';

const CreateArticlePage = () => {
  const navigate = useNavigate();

  useAuth();

  const titleInput = useInput('');
  const descriptionInput = useInput('');
  const categoryInput = useInput('cinema');
  const createArticle = useRequest(createArticleAPI);

  const [body, setBody] = useState('');

  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const user_id = useSelector((state) => state.user.user?.id);
  const onCreate = (e) => {
    e.preventDefault();

    const title = titleInput.value,
      description = descriptionInput.value,
      category = categoryInput.value;

    setErrors(null);
    const cleanBody = body.replace(/<\/?[^>]+(>|$)/g, '');
    if (cleanBody.trim() === '') {
      return setErrors({
        body: ['Это поле не может быть пустым.'],
      });
    }

    setIsLoading(true);
    createArticle({ title, description, body, category, author_id: user_id })
      .then((data) => {
        navigate('/');
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(err.response.data);
      });
  };

  const bodyError = !!errors?.body;
  return (
    <MainLayout>
      <form action='' onSubmit={onCreate}>
        <Field
          errors={errors}
          label={'Название статьи'}
          name='title'
          input={titleInput}
          isDisabled={isLoading}
          mb='16px'
        />
        <Field
          errors={errors}
          label={'Короткое описание статьи'}
          name='description'
          input={descriptionInput}
          isDisabled={isLoading}
          mb='16px'
        />
        <div>
          <p className={`${bodyError ? 'text-red-600' : ''}`}>Текст статьи</p>
          <TextEditor value={body} onChange={setBody} edit={true} />
        </div>
        {bodyError && <p className='text-red-600'>{errors.body[0]}</p>}
        <div className='mt-3'>
          <label htmlFor='category'>Категория статьи</label>
          <select
            name='category'
            id='category'
            className='ml-1 border'
            {...categoryInput}
          >
            <option value='cinema'>Кино</option>
            <option value='travelling'>Путешествия</option>
            <option value='science'>Наука</option>
            <option value='technology'>Технология</option>
            <option value='stlye'>Стиль</option>
            <option value='celebrities'>Знаменитости</option>
            <option value='culture'>Культура</option>
            <option value='sport'>Спорт</option>
            <option value='finance'>Финансы</option>
            <option value='politics'>Политика</option>
          </select>
        </div>

        <Button isLoading={isLoading}>Создать</Button>
      </form>
    </MainLayout>
  );
};

export default CreateArticlePage;
