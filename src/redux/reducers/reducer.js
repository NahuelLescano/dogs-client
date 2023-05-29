import {
  GET_ALL_DOGS,
  DOGS_FILTERED,
  GET_ALL_TEMPERAMENTS,
} from '../action-types';

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
      };

    case DOGS_FILTERED:
      return {
        ...state,
      };

    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
