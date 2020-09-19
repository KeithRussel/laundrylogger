import React, { useState, useContext, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      M.toast({ html: 'Invalid Credentials', classes: 'red darken-4' });
      clearErrors();
      console.log('test invalid auth');
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      M.toast({ html: 'Please fill in all fields', classes: 'red darken-4' });
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='container'>
      <h1 className='center'>
        Account <span className='blue-text'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='email'
                name='email'
                value={email}
                onChange={onChange}
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field col s12'>
              <input
                type='password'
                name='password'
                value={password}
                onChange={onChange}
              />
              <label htmlFor='password'>Password</label>
            </div>
            <button
              className='waves-effect waves-light btn'
              type='submit'
              style={{ margin: '0 10px', display: 'block' }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
