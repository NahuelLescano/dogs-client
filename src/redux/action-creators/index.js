import { GET_ALL_DOGS } from '../action-types';
import axios from 'axios';
const { REACT_APP_GET_ALL_DOGS } = process.env;

export const getAllDogs = () => {
  return async (dispatch) => {
    const response = await axios.get(REACT_APP_GET_ALL_DOGS);
    dispatch({
      type: GET_ALL_DOGS,
      payload: response.data,
    });
  };
};
