import React from 'react';

import moment from '../utils/moment';
import avatar from '../images/avatar.png';

const Comment = ({ content, created_at: created_it, author_name }) => {
  return (
    <div class='bg-white p-2 pt-4 rounded shadow-md mb-4'>
      <div class='flex ml-3'>
        <div class='mr-3'>
          <img
            width={48}
            height={48}
            src={avatar}
            alt=''
            class='rounded-full'
          />
        </div>
        <div>
          <h1 class='font-semibold'>{author_name}</h1>
          <p class='text-xs text-gray-500'>{moment(created_it).fromNow()}</p>
        </div>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
