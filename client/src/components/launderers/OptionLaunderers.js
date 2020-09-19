import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import LaundererContext from '../../context/launderer/laundererContext';

const OptionLaunderers = () => {
  const laundererContext = useContext(LaundererContext);

  const { launderers, getLaunderers } = laundererContext;

  useEffect(() => {
    getLaunderers();
    // eslint-disable-next-line
  }, []);

  return (
    launderers !== null &&
    launderers.map((launderer) => (
      <option
        value={`${launderer.firstName} ${launderer.lastName}`}
        key={launderer._id}
      >
        {launderer.firstName} {launderer.lastName}
      </option>
    ))
  );
};

OptionLaunderers.propTypes = {
  launderer: PropTypes.string.isRequired,
};

export default OptionLaunderers;
