import React from 'react';
import { NavLink } from 'react-router-dom';

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

const Navbar = () => {
  return (
    <aside className='w-64 flex-shrink-0'>
      <ul>
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            `text-lg transition-colors inline-block w-full p-2${
              isActive
                ? ' bg-gray-100 rounded-md cursor-default'
                : ' hover:text-red-400'
            }`
          }
        >
          Лента
        </NavLink>
        <hr className='my-3' />
        {Object.entries(categories).map(([cat, alias], i) => (
          <li className='' key={i}>
            <NavLink
              to={`/category/${cat}`}
              className={({ isActive }) =>
                `text-lg transition-colors inline-block w-full p-2${
                  isActive
                    ? ' bg-gray-100 rounded-md cursor-default'
                    : ' hover:text-red-400'
                }`
              }
            >
              {alias}
            </NavLink>
          </li>
        ))}
      </ul>
      <hr className='my-3' />
      <a
        href='http://localhost:8000/swagger-ui/#'
        className='pl-2 text-sm text-gray-400 hover:text-red-400'
      >
        API
      </a>
    </aside>
  );
};

export default Navbar;
