import React from 'react';

const Container = ({ className, children }) => {
  return (
    <div className={`${'max-w-5xl w-full mx-auto px-4'} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
