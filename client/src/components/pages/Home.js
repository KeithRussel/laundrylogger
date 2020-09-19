import React, { useEffect, useContext } from 'react';
import AddBtn from '../layout/AddBtn';
import Search from '../layout/Search';
import Logs from '../logs/Logs';

import M from 'materialize-css/dist/js/materialize.min.js';
import LogModal from '../logs/LogModal';
import AddLaundererModal from '../launderers/AddLaundererModal';
import Launderers from '../launderers/Launderers';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    M.AutoInit();

    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <AddBtn />
      <div className='container'>
        <Search />
        <LogModal />
        <AddLaundererModal />
        <Launderers />
        <ul className='collection with-header'>
          <li className='collection-header center'>
            <h4>Logs</h4>
          </li>
          <Logs />
        </ul>
      </div>
    </div>
  );
};

export default Home;
