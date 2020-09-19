import React, { useState, useContext } from 'react';
import LaundererContext from '../../context/launderer/laundererContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLaundererModal = () => {
  const laundererContext = useContext(LaundererContext);

  const [launderer, setLaunderer] = useState({
    firstName: '',
    lastName: '',
  });

  const { addLaunderer } = laundererContext;

  const { firstName, lastName } = launderer;

  // setLaunderer({ ...launderer, [e.target.name]: e.target.value });

  const onChange = (e) => {
    setLaunderer({ ...launderer, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addLaunderer(launderer);

    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter all fiels' });
    } else {
      M.toast({ html: 'Launderer Added!' });
    }

    setLaunderer({
      firstName: '',
      lastName: '',
    });
  };

  return (
    <div id='add-launderer-modal' className='modal'>
      <div className='modal-content'>
        <h4>Fill Launderer Name</h4>
        <div className='row'>
          <form className='col s12' onSubmit={onSubmit}>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  id='first_name'
                  type='text'
                  name='firstName'
                  value={firstName}
                  onChange={onChange}
                />
                <label htmlFor='first_name'>First Name</label>
              </div>
              <div className='input-field col s6'>
                <input
                  id='last_name'
                  type='text'
                  name='lastName'
                  value={lastName}
                  onChange={onChange}
                />
                <label htmlFor='last_name'>Last Name</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className={
            firstName === '' || lastName === ''
              ? 'waves-effect waves-green btn'
              : 'modal-close waves-effect waves-green btn'
          }
        >
          Submit
        </a>
      </div>
    </div>
  );
};

export default AddLaundererModal;
