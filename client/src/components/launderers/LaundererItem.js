import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LaundererContext from '../../context/launderer/laundererContext';

const LaundererItem = ({ launderer }) => {
  const laundererContext = useContext(LaundererContext);
  const { deleteLaunderer } = laundererContext;
  const { _id, firstName, lastName } = launderer;

  const onDelete = () => {
    deleteLaunderer(_id);
    console.log('Launderer Deleted');
  };

  return (
    <li className='collection-item'>
      <div>
        {firstName} {lastName}
        <a href='#!' className='secondary-content' onClick={onDelete}>
          <i className='material-icons'>delete</i>
        </a>
      </div>
    </li>
  );
};

LaundererItem.propTypes = {
  launderer: PropTypes.object.isRequired,
};

export default LaundererItem;
