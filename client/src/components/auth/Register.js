import React, { useState, useContext, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  // const toastDanger = `<span class='red darken-4'>User already exists</span>`;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User Email already exists') {
      M.toast({ html: 'User already exists', classes: 'red darken-4' });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '' || password2 === '') {
      M.toast({
        html: 'Please complete to fill the fields',
        classes: 'red darken-4',
      });
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match!', classes: 'red darken-4' });
    } else {
      register({
        name,
        email,
        password,
      });
      console.log(name, email, password);
    }

    console.log('Register Submit');
  };

  return (
    <div className='container'>
      <h1 className='center'>
        Account <span className='blue-text'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='input-field col s12'>
              <input type='text' name='name' value={name} onChange={onChange} />
              <label htmlFor='name'>Name</label>
            </div>
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
                minLength='6'
              />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-field col s12'>
              <input
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}
                minLength='6'
              />
              <label htmlFor='password2'>Confirm Password</label>
            </div>
            <button
              className='waves-effect waves-light btn'
              type='submit'
              style={{ margin: '0 10px', display: 'block' }}
            >
              Register
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
