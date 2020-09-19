import { GET_LAUNDERERS, ADD_LAUNDERER, DELETE_LAUNDERER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LAUNDERERS:
      return {
        ...state,
        launderers: action.payload,
        // loading: false,
      };
    case ADD_LAUNDERER:
      return {
        ...state,
        launderers: [...state.launderers, action.payload],
        // loading: false,
      };
    case DELETE_LAUNDERER:
      return {
        ...state,
        launderers: state.launderers.filter(
          (launderer) => launderer._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
