import React from 'react';
import { Link } from 'react-router-dom';

import moment from '../utils/moment';
import avatar from '../images/avatar.png';
import comments from '../images/comments.svg';

const NewsCard = ({
  name,
  title,
  description,
  id,
  likes_count,
  comments_count,
  author_name,
  created_at,
  author_id,
}) => {
  return (
    <li className='rounded-2xl'>
      <div className='border shadow rounded-md p-4 w-full mx-auto mb-4 hover:-translate-y-1 transform transition-transform'>
        <div className='flex items-center'>
          <img
            className='rounded-full'
            width='32'
            height='32'
            src={avatar}
            alt=''
          />
          <Link className='ml-3' to={`/${author_id}`}>
            {author_name}
          </Link>
        </div>
        <hr />
        <div className='my-1'>
          <Link to={`${'/article/'}${id}`} className='text-xl font-semibold'>
            {title}
          </Link>
          <time className='ml-1 text-xs text-gray-400'>
            {moment(created_at).fromNow()}
          </time>
        </div>

        <p className=''>{description}</p>
        <div className='mt-1 flex items-center'>
          <svg
            width='24'
            height='24'
            xmlns='http://www.w3.org/2000/svg'
            fill-rule='evenodd'
            clip-rule='evenodd'
          >
            <path
              fill='black'
              d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181'
            />
          </svg>
          <span className='ml-1'>{likes_count}</span>
          <div></div>
          <Link
            className='ml-auto flex items-center'
            to={`${'/article/'}${id}`}
          >
            <img width='24' height='24' src={comments} alt='' />
            <span>{comments_count}</span>
          </Link>
        </div>
      </div>
    </li>
  );
};
// К""комментарии
export default NewsCard;
