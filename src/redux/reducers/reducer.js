import {
  GET_ALL_DOGS,
  DOGS_FILTERED,
  GET_ALL_TEMPERAMENTS,
  ERROR,
  DOG_TEMPERAMENT,
  DOG_RESET,
  ORDER,
  SEARCH_DOG,
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

      const error = payload === 'database' && dogs.length === 0;
      if (!error) {
        return {
          ...state,
          allDogs: dogs,
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

    case ORDER:
      const parseMetricWeight = (obj) => {
        if (!obj || !obj.metric) {
          return Number.POSITIVE_INFINITY; // To the end of the sorted list
        }

        const weight = obj.metric.split(' - ')[0];
        return isNaN(weight) ? Number.POSITIVE_INFINITY : weight;
      };
      return {
        ...state,
        allDogs: [
          ...state.allDogs.sort((a, b) => {
            if (payload === 'ascending breed') {
              return a.name.localeCompare(b.name);
            }

            if (payload === 'descending breed') {
              return b.name.localeCompare(a.name);
            }

            const aWeight = parseMetricWeight(a.weight);
            const bWeight = parseMetricWeight(b.weight);
            if (payload === 'ascending weight') {
              return aWeight - bWeight;
            }

            return bWeight - aWeight;
          }),
        ],
      };

    case SEARCH_DOG:
      return {
        ...state,
        allDogs: state.allDogs.filter((dog) => dog.name === payload),
      };

    default:
      return state;
  }
};

export default rootReducer;
