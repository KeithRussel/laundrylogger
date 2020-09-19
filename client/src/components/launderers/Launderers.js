import React, { Fragment, useContext, useEffect } from 'react';
import LaundererItem from './LaundererItem';
import LaundererContext from '../../context/launderer/laundererContext';

const Launderers = () => {
  const laundererContext = useContext(LaundererContext);

  const { launderers, getLaunderers } = laundererContext;
  // const [launderers, setLaunderers] = useState([

  // ]);

  useEffect(() => {
    getLaunderers();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div id='launderer-list-modal' className='modal'>
        <div className='modal-content'>
          <ul className='collection with-header'>
            <li className='collection-header'>
              <h4>Launderer Names</h4>
            </li>
            {launderers.map((launderer) => (
              <LaundererItem key={launderer._id} launderer={launderer} />
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Launderers;
