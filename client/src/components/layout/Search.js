import React, { useContext, useRef, useEffect } from 'react';
import LogContext from '../../context/log/logContext';

const Search = () => {
  const logContext = useContext(LogContext);
  const text = useRef('');

  const { filterLogs, clearFilter, filtered } = logContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterLogs(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <div className='row'>
        <div className='input-field col s12'>
          <i className='material-icons prefix'>search</i>
          <input ref={text} onChange={onChange} id='search' type='search' />
          <label htmlFor='search'>Search</label>
        </div>
      </div>
    </form>
  );
};

export default Search;
