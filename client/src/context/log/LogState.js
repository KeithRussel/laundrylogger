import React, { useReducer } from 'react';
import axios from 'axios';
import LogContext from './logContext';
import logReducer from './logReducer';
import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_LOGS,
  CLEAR_LOGS,
  CLEAR_FILTER,
  LOG_ERROR,
  UPDATE_LOG,
} from '../types';

const LogState = (props) => {
  const initialState = {
    logs: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // Get Logs
  const getLogs = async () => {
    try {
      const res = await axios.get('/api/logs');

      dispatch({
        type: GET_LOGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Log
  const addLog = async (log) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/logs', log, config);

      dispatch({ type: ADD_LOG, payload: res.data });
    } catch (err) {
      dispatch({ type: LOG_ERROR, payload: err.response.msg });
    }
  };

  // Delete Log
  const deleteLog = async (id) => {
    try {
      await axios.delete(`/api/logs/${id}`);

      dispatch({
        type: DELETE_LOG,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Log
  const updateLog = async (log) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/logs/${log._id}`, log, config);

      dispatch({
        type: UPDATE_LOG,
        payload: res.data,
      });

      console.log(res.data);
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response.msg,
      });
    }
  };
  // const updateLog = (log) => {
  //   dispatch({ type: UPDATE_LOG, payload: log });
  //   console.log(log);
  // };

  // Clear Logs
  const clearLogs = () => {
    dispatch({ type: CLEAR_LOGS });
  };

  // Set Current Log
  const setCurrent = (log) => {
    dispatch({ type: SET_CURRENT, payload: log });
  };

  // Clear Current Log
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Log
  const filterLogs = (text) => {
    dispatch({ type: FILTER_LOGS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addLog,
        deleteLog,
        setCurrent,
        clearCurrent,
        filterLogs,
        updateLog,
        clearFilter,
        getLogs,
        clearLogs,
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
