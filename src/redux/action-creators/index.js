import {
  GET_ALL_DOGS,
  DOGS_FILTERED,
  GET_ALL_TEMPERAMENTS,
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

export const filteredDogs = (fileredDogs) => {
  return {
    type: DOGS_FILTERED,
    payload: fileredDogs,
  };
};
