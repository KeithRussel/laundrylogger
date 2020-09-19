import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LogContext from '../../context/log/logContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearLogs } = logContext;

  const onLogout = () => {
    logout();
    clearLogs();
  };

  const authLinks = (
    <Fragment>
      <li
        style={{
          marginRight: '15px',
          border: '1px solid',
          borderRadius: '35px',
          padding: '0 5px',
          backgroundColor: '#0000001a',
        }}
      >
        Hello, <span>{user && user.name}</span>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <a href='#!' onClick={onLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav>
      <div className='container'>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>
            {title}
            <i className='material-icons'>{icon}</i>
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Laundry Logger',
  icon: 'attach_file',
};

export default Navbar;
