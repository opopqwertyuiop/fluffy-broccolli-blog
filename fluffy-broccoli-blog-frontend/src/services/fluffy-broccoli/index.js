import axios from 'axios';
//checkToken{token}i
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 3000,
});

export default instance;

export const register = (
  { username, email, password, re_password },
  cancelToken
) =>
  instance.post(
    '/auth/users/',
    { username, email, password, re_password },
    { cancelToken }
  );

export const login = ({ username, password }, cancelToken) =>
  instance.post('/auth/token/login/', { username, password }, { cancelToken });

export const activate = ({ uid, token }, cancelToken) =>
  instance.post('/auth/users/activation/', { uid, token }, { cancelToken });

export const getUser = () => instance.get('/auth/users/me/');

export const createArticle = (
  { title, description, body, author_id, category },
  cancelToken
) =>
  instance.post(
    '/api/articles/',
    { article: { title, description, body, author_id, category } },
    { cancelToken }
  );

export const getArticles = (
  { limit = 10, offset = 0, sort = 'desc', category, in_text },
  cancelToken
) =>
  instance.get(
    `/api/articles/?limit=${limit}&offset=${offset}&sort=${sort}${
      in_text ? `&in_text=${in_text}` : ''
    }${category ? `&category=${category}` : ''}`,
    {
      cancelToken,
    }
  );

export const getArticle = ({ id }, cancelToken) =>
  instance.get(`${'/api/articles/'}${id}`, cancelToken);

export const getComments = ({ id }, cancelToken) =>
  instance.get(`/api/comments/${id}`, cancelToken);

export const postComment = ({ id, content, author_id }, cancelToken) =>
  instance.post(
    `/api/comments/${id}`,
    { comment: { content, author_id } },
    cancelToken
  );

export const postLike = ({ id }, cancelToken) =>
  instance.put(`/api/like/${id}`, undefined, { cancelToken });

export const checkLike = ({ id }, cancelToken) =>
  instance.get(`/api/like/${id}`, { cancelToken });

export const editArticle = ({ id }, article, cancelToken) =>
  instance.put(`/api/articles/${id}`, { article }, { cancelToken });
