import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  FILTER_LOGS,
  CLEAR_FILTER,
  LOG_ERROR,
  CLEAR_LOGS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state, // Current State
        logs: [action.payload, ...state.logs],
        loading: false,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) =>
          log._id === action.payload._id ? action.payload : log
        ),
        loading: false,
      };
    // case UPDATE_LOG:
    //   return {
    //     ...state,
    //     logs: state.logs.map((log) =>
    //       log.id === action.payload.id ? action.payload : log
    //     ),
    //     loading: false,
    //   };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log._id !== action.payload),
        loading: false,
      };
    case CLEAR_LOGS:
      return {
        ...state,
        logs: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_LOGS:
      return {
        ...state,
        filtered: state.logs.filter((log) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return log.message.match(regex) || log.launderer.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case LOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
