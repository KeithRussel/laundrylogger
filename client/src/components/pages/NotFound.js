import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container center'>
      <h1>404 - Not Found!</h1>
      <Link to='/'>Go Home</Link>
    </div>
  );
};

export default NotFound;
