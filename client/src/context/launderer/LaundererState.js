import React, { useReducer } from 'react';
import axios from 'axios';
// import uuid from 'react-uuid';
import LaundererContext from './laundererContext';
import laundererReducer from './laundererReducer';

import {
  GET_LAUNDERERS,
  ADD_LAUNDERER,
  DELETE_LAUNDERER,
  LAUNDERER_ERROR,
  LOG_ERROR,
} from '../types';

const LaundererState = (props) => {
  const initialState = {
    // launderers: [
    //   {
    //     id: 1,
    //     firstName: 'Keith',
    //     lastName: 'Russel',
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Kaye',
    //     lastName: 'Smith',
    //   },
    // ],
    launderers: [],
    error: null,
  };

  const [state, dispatch] = useReducer(laundererReducer, initialState);

  // Get Launderers
  const getLaunderers = async () => {
    try {
      const res = await axios.get('/api/launderers');

      dispatch({
        type: GET_LAUNDERERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LAUNDERER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Launderer
  const addLaunderer = async (launderer) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/launderers', launderer, config);
      dispatch({ type: ADD_LAUNDERER, payload: res.data });
    } catch (err) {
      dispatch({ type: LOG_ERROR, payload: err.response.msg });
    }
  };
  // const addLaunderer = (launderer) => {
  //   launderer.id = uuid();
  //   dispatch({ type: ADD_LAUNDERER, payload: launderer });
  // };

  // Delete Log
  const deleteLaunderer = async (id) => {
    try {
      await axios.delete(`/api/launderers/${id}`);

      dispatch({
        type: DELETE_LAUNDERER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: LAUNDERER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <LaundererContext.Provider
      value={{
        launderers: state.launderers,
        error: state.error,
        addLaunderer,
        getLaunderers,
        deleteLaunderer,

        // clearLaunderers,
      }}
    >
      {props.children}
    </LaundererContext.Provider>
  );
};

export default LaundererState;
