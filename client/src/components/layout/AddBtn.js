import React, { useContext } from 'react';
import LogContext from '../../context/log/logContext';

const AddBtn = () => {
  const logContext = useContext(LogContext);

  const { clearCurrent } = logContext;

  const onHandlerAddBtn = () => {
    clearCurrent();
  };
  return (
    <div className='fixed-action-btn'>
      <a
        onClick={onHandlerAddBtn}
        href='#log-form-modal'
        className='btn-floating btn-large blue darken-2 modal-trigger'
      >
        <i className='large material-icons'>add</i>
      </a>
      <ul>
        <li>
          <a
            href='#launderer-list-modal'
            className='btn-floating green modal-trigger'
          >
            <i className='material-icons'>person</i>
          </a>
        </li>
        <li>
          <a
            href='#add-launderer-modal'
            className='btn-floating red modal-trigger'
          >
            <i className='material-icons'>person_add</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
