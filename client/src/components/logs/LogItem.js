import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LogContext from '../../context/log/logContext';

const LogItem = ({ log }) => {
  const logContext = useContext(LogContext);
  const { deleteLog, setCurrent, clearCurrent } = logContext;

  const { _id, message, kilo, attention, launderer, date } = log;

  const onDelete = () => {
    deleteLog(_id);
    console.log('Delete clicked');
    clearCurrent();
  };

  return (
    <li className='collection-item'>
      <div>
        <a
          href='#log-form-modal'
          className='modal-trigger'
          // style={{ color: attention ? 'red' : 'blue' }}
          onClick={() => setCurrent(log)}
        >
          {message}
        </a>
        {attention && attention ? (
          <span className='badge red' style={{ color: '#fff' }}>
            Urgent
          </span>
        ) : null}
        <br />
        <a
          href='#!'
          className='secondary-content'
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={onDelete}
        >
          <i className='material-icons'>delete</i>
        </a>
        <span>
          {`${kilo} Kilo - Launderer: ${launderer}, posted by Admin - ${date}`}
        </span>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  // setCurrent: PropTypes.func.isRequired,
  // deleteLog: PropTypes.func.isRequired,
};

export default LogItem;
