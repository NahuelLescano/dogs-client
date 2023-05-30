import {
  GET_ALL_DOGS,
  DOGS_FILTERED,
  GET_ALL_TEMPERAMENTS,
  ERROR,
  DOG_TEMPERAMENT,
  DOG_RESET,
} from '../action-types';

const initialState = {
  error: false,
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
      const myDogs = state.allDogs;
      const dogs =
        payload === 'api'
          ? myDogs.filter((dog) => typeof dog.id === 'number')
          : myDogs.filter((dog) => typeof dog.id === 'string');

      const error = payload === 'base de datos' && dogs.length === 0;
      if (!error) {
        return {
          ...state,
          dogs,
        };
      }

      return {
        ...state,
        error: true,
      };

    case DOG_TEMPERAMENT:
      const dogTemper = state.dogs.filter((dog) =>
        dog.temperament?.includes(payload)
      );
      return {
        ...state,
        allDogs: dogTemper,
      };

    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };

    case DOG_RESET:
      return {
        ...state,
        allDogs: state.dogs,
      };

    case ERROR:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export default rootReducer;
