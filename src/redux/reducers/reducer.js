import { GET_ALL_DOGS } from '../action-types';

const initialState = {
  dogs: [],
  allDogs: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOGS:
      // console.log(payload);
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
