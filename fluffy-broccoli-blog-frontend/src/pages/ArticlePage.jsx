import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';
import Cry from '../components/Cry';
import Button from '../components/Button';
import Comment from '../components/Comment';
import TextEditor from '../components/TextEditor';
import useRequest from '../hooks/useRequest';
import useInput from '../hooks/useInput';
import {
  getArticle as getArtilceAPI,
  getComments as getCommentsAPI,
  postComment as postCommentAPI,
  postLike as postLikeAPI,
  checkLike as checkLikeAPI,
} from '../services/fluffy-broccoli/index';
import moment from '../utils/moment';
import avatar from '../images/avatar.png';

// ise
const ArticlePage = () => {
  const commentInput = useInput('');

  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const getArticle = useRequest(getArtilceAPI);
  const getComments = useRequest(getCommentsAPI);
  const postComment = useRequest(postCommentAPI);
  const postLike = useRequest(postLikeAPI);
  const checkLike = useRequest(checkLikeAPI);

  const user_id = useSelector((state) => state.user?.user?.id);
  const isAuth = useSelector((state) => state.user.isAuth);

  const { id } = useParams();
  useEffect(() => {
    const promises = [getArticle({ id }), getComments({ id })];
    if (isAuth) {
      promises.push(checkLike({ id }));
    }
    Promise.all(promises)
      .then((data) => {
        setArticle(data[0].data.articles);
        setComments(data[1].data === '' ? [] : data[1].data.comments);
        if (isAuth) {
          setIsLiked(data[2].data.is_liked);
        }
        setLikesCount(data[0].data.articles.likes_count);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
        console.log(err);
      });
    getArticle({ id });
  }, [id, checkLike, getArticle, getComments, isAuth]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (commentInput.value.trim() === '') {
      return;
    }
    setIsCommentLoading(true);
    postComment({ id, content: commentInput.value, author_id: user_id })
      .then((data) => {
        setComments((comments) => [data.data.comment, ...comments]);
        setIsCommentLoading(false);
        commentInput.onChange({
          target: {
            value: '',
          },
        });
        console.log(data);
      })
      .catch((err) => {});
  };
  const onLikeClick = () => {
    if (isLikeLoading) {
      return;
    }
    setIsLikeLoading(true);
    postLike({ id })
      .then((data) => {
        setIsLiked(!isLiked);
        setLikesCount(data.data.likes_count);
        setIsLikeLoading(false);
      })
      .catch(() => {
        setIsLikeLoading(false);
      });
  };
  return (
    <MainLayout>
      {isLoading ? (
        <div className='h-full flex items-center justify-center'>
          <Loader />
        </div>
      ) : error ? (
        <div className='flex items-center justify-center h-full flex-col'>
          <Cry
            message={
              'Скорее всего такой статьи не существует или она была удалена'
            }
          >
            <p>ошибка</p>
          </Cry>
        </div>
      ) : (
        <>
          <div className='flex items-center'>
            <div>
              <div className=''>
                <h3 className='text-2xl'>{article.title}</h3>
              </div>

              <time className='ml-1 text-xs text-gray-400'>
                {moment(article.created_at).format('LLLL')}
              </time>

              {isAuth && article.author_id === user_id && (
                <div>
                  {' '}
                  <Link
                    className='text-blue-600 font-semibold hover:text-red-400'
                    to={`${'/edit/'}${id}`}
                  >
                    Редактировать
                  </Link>
                </div>
              )}
            </div>
            <div className='flex items-center ml-auto'>
              {' '}
              <img
                className='rounded-full'
                width='32'
                height='32'
                src={avatar}
                alt=''
              />
              <Link className='ml-3' to={`/${article.author_id}`}>
                {article.author_name}
              </Link>
            </div>
          </div>
          <hr className='mb-4' />
          <TextEditor edit={false} value={article.body} />
          <div className='mt-1 flex items-center'>
            <button
              onClick={onLikeClick}
              disabled={isLikeLoading || !isAuth}
              style={{
                cursor: isLikeLoading || !isAuth ? 'default' : 'pointer',
              }}
              className='flex'
            >
              <svg
                width='24'
                height='24'
                xmlns='http://www.w3.org/2000/svg'
                fillRule='evenodd'
                clipRule='evenodd'
              >
                <path
                  fill={`${isLiked && isAuth ? 'red' : 'black'}`}
                  d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181'
                />
              </svg>
              <span className='ml-1'>{likesCount}</span>
            </button>
          </div>
          <div className='text-2xl'>
            <h3 className='mb-4'>Комментарии</h3>
          </div>
          {!isAuth ? (
            'Авторизируйтесь, чтобы иметь возможность оставлять комментарии и ставить лайки'
          ) : (
            <form action='' onSubmit={onSubmit}>
              <textarea
                style={{ marginBottom: '0 !important' }}
                {...commentInput}
                className='w-full border p-3'
                name='comment'
                id='comment'
                rows='3'
                placeholder='Введите текст комментария...'
              ></textarea>
              <Button isLoading={isCommentLoading}>Отправить</Button>
            </form>
          )}

          {comments.length === 0 && <p>Комментариев ещё нет...</p>}
          <div className='mt-4'>
            {comments.map((comment) => (
              <Comment {...comment} />
            ))}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default ArticlePage;
