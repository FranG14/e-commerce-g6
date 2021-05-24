import * as api from '../api/index.js';

import{
    FILTER_BY_PRICE,
    FILTER_BY_CATEGORY,
    FILTER_BY_NAME,
    FILTER_BY_BRAND,
    FILTER_BY_SIZE
} from "../constants";

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea


export const filterByName = (filterName,filter) => async(dispatch) => {
  return await api.filterByName(filterName,filter)
  .then((res) => {
    dispatch({
      type: FILTER_BY_NAME,
      payload: res.data
    })
  })
  .catch((error) => console.log(error))
}


export const filterByBrand = (filter) => async(dispatch) => {
  return await api.filterByBrand(filter)
  .then((res) => {
    dispatch({
      type: FILTER_BY_BRAND,
      payload: res.data
    })
  })
  .catch((error) => console.log(error))
}



export const filterByCategory = (name) => async(dispatch) => {
  return await api.filterByCategory(name)
  .then((res) => {
    dispatch({
      type: FILTER_BY_CATEGORY,
      payload: res.data
    })
  })
  .catch((error) => console.log(error))
}


