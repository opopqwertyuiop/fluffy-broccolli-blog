import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getArticles as getArticlesAPI } from '../services/fluffy-broccoli/index';
import useRequest from '../hooks/useRequest';
import LoadingCart from '../components/LoadingCart';
import NewsCard from '../components/NewsCard';
import MainLayout from '../layouts/MainLayout';

const categories = {
  cinema: 'Кино',
  travelling: 'Путешествия',
  science: 'Наука',
  technology: 'Технологии',
  style: 'Стиль',
  celebrities: 'Знаменитости',
  culture: 'Культура',
  sport: 'Спорт',
  finance: 'Финансы',
  politics: 'Политика',
};

const MainPage = () => {
  const { category, text: searchText } = useParams();
  console.log(category);

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState(null);

  const getArticles = useRequest(getArticlesAPI);
  useEffect(() => {
    setIsLoading(true);
    getArticles({ category, in_text: searchText })
      .then((data) => {
        setArticles(data?.data?.articles);
        setIsLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, searchText, getArticles]);

  const text = category
    ? `Категория: ${categories[category]}`
    : searchText
    ? `${'Результат поиска: '}${searchText}`
    : 'Лента рекомендаций';
  return (
    <MainLayout>
      <h3 className='text-2xl font-semibold mb-6'>{text}</h3>
      <ul>
        {isLoading ? (
          new Array(5).fill(<LoadingCart />)
        ) : (
          <>
            {articles
              ? articles.map((cart) => <NewsCard key={cart.id} {...cart} />)
              : 'Статей нет'}
          </>
        )}
      </ul>
    </MainLayout>
  );
};

export default MainPage;
