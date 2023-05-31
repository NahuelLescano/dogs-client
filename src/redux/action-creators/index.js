import {
  GET_ALL_DOGS,
  DOGS_FILTERED,
  GET_ALL_TEMPERAMENTS,
  DOG_TEMPERAMENT,
  DOG_RESET,
  ERROR,
  ORDER,
  SEARCH_DOG,
} from '../action-types';
import axios from 'axios';
const { REACT_APP_GET_ALL_DOGS, REACT_APP_GET_TEMPERAMENTS } = process.env;

export const getAllDogs = () => {
  return async (dispatch) => {
    const response = await axios.get(REACT_APP_GET_ALL_DOGS);
    dispatch({
      type: GET_ALL_DOGS,
      payload: response.data,
    });
  };
};

export const getAllTemperaments = () => {
  return async (dispatch) => {
    const response = await axios.get(REACT_APP_GET_TEMPERAMENTS);
    dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: response.data,
    });
  };
};

export const filterDogs = (fileredDogs) => {
  if (fileredDogs.name === 'create' && fileredDogs.value !== 'reset') {
    return {
      type: DOGS_FILTERED,
      payload: fileredDogs.value,
    };
  }

  if (fileredDogs.value === 'reset') {
    return {
      type: DOG_RESET,
    };
  }

  return {
    type: DOG_TEMPERAMENT,
    payload: fileredDogs.value,
  };
};

export const setError = () => {
  return {
    type: ERROR,
  };
};

export const orderDogs = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

export const searchDog = (dogName) => {
  return {
    type: SEARCH_DOG,
    payload: dogName,
  };
};
