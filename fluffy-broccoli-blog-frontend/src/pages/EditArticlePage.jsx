import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import useInput from '../hooks/useInput';
import useRequest from '../hooks/useRequest';
import useAuth from '../hooks/useAuth';
import {
  getArticle as getArticleAPI,
  editArticle as editArticleAPI,
} from '../services/fluffy-broccoli/index';
import MainLayout from '../layouts/MainLayout';
import TextEditor from '../components/TextEditor';
import Field from '../components/Field';
import Button from '../components/Button';
import Loader from '../components/Loader';
// Create

let initial = {};

const EditArticlePage = () => {
  const navigate = useNavigate();

  useAuth();

  const titleInput = useInput('');
  const descriptionInput = useInput('');
  const categoryInput = useInput('cinema');
  const getArticle = useRequest(getArticleAPI);
  const editArticle = useRequest(editArticleAPI);

  const [body, setBody] = useState('');

  const [errors, setErrors] = useState(null);
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(null);

  const user_id = useSelector((state) => state.user.user?.id);

  const { id } = useParams();
  useEffect(() => {
    getArticle({ id })
      .then((data) => {
        if (!data.data.articles || data.data.articles.author_id !== user_id) {
          return navigate('/');
        }
        const { title, description, body, category } = data.data.articles;
        initial = { title, description, body, category };
        titleInput.onChange({ target: { value: title } });
        descriptionInput.onChange({ target: { value: description } });
        setBody(body);
        categoryInput.onChange({ target: { value: category } });
        setArticleIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, []);

  const onEdit = (e) => {
    e.preventDefault();

    const title = titleInput.value,
      description = descriptionInput.value,
      category = categoryInput.value;

    setErrors(null);
    const cleanBody = body.replace(/<\/?[^>]+(>|$)/g, '');
    if (cleanBody.trim() === '') {
      return setErrors({
        body: ['?????? ???????? ???? ?????????? ???????? ????????????.'],
      });
    }

    const newArticle = {};

    if (title !== initial.title) {
      newArticle.title = title;
    }

    if (description !== initial.description) {
      newArticle.description = description;
    }

    if (category !== initial.category) {
      newArticle.category = category;
    }

    if (body !== initial.body) {
      newArticle.body = body;
    }

    setIsLoading(true);

    editArticle({ id }, newArticle)
      .then((data) => {
        navigate(`${'/article/'}${id}`);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setArticleIsLoading(false);
        setErrors(err?.response?.data);
      });
  };

  const bodyError = !!errors?.body;
  if (articleIsLoading) {
    return (
      <MainLayout>
        <div className='flex items-center justify-center w-full h-full'>
          <Loader></Loader>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <form action='' onSubmit={onEdit}>
        <Field
          errors={errors}
          label={'???????????????? ????????????'}
          name='title'
          input={titleInput}
          isDisabled={isLoading}
          mb='16px'
        />
        <Field
          errors={errors}
          label={'???????????????? ???????????????? ????????????'}
          name='description'
          input={descriptionInput}
          isDisabled={isLoading}
          mb='16px'
        />
        <div>
          <p className={`${bodyError ? 'text-red-600' : ''}`}>?????????? ????????????</p>
          <TextEditor value={body} onChange={setBody} edit={true} />
        </div>
        {bodyError && <p className='text-red-600'>{errors.body[0]}</p>}
        <div className='mt-3'>
          <label htmlFor='category'>?????????????????? ????????????</label>
          <select
            name='category'
            id='category'
            className='ml-1 border'
            {...categoryInput}
          >
            <option value='cinema'>????????</option>
            <option value='travelling'>??????????????????????</option>
            <option value='science'>??????????</option>
            <option value='technology'>????????????????????</option>
            <option value='stlye'>??????????</option>
            <option value='celebrities'>????????????????????????</option>
            <option value='culture'>????????????????</option>
            <option value='sport'>??????????</option>
            <option value='finance'>??????????????</option>
            <option value='politics'>????????????????</option>
          </select>
        </div>

        <Button isLoading={isLoading}>??????????????</Button>
      </form>
    </MainLayout>
  );
};

export default EditArticlePage;
