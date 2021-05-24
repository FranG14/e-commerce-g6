import * as api from '../api/index.js';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DETAIL_PRODUCT,
  SEARCH_PRODUCTS
} from "../constants";


//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea

export const getAllProducts = (page) => async (dispatch) => {
  dispatch({
    type: GET_ALL_PRODUCTS,
  });
  return await api.getAllProducts(page)
    .then((res) => {
      console.log("PRODUCT ACTION",res.data)
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: err.response,
      });
    });
};

export const searchProducts = (name) => async(dispatch) => {
    return await api.searchProducts(name)
      .then((res) => {
        dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
    })

    .catch((error) => console.log(error));
  
}

export const detailProduct = (id) => async(dispatch)=> {
    return await api.detailProduct(id)
      .then((res) => {
        dispatch({ type: DETAIL_PRODUCT, payload: res.data });
      })
      .catch((error) => {
        dispatch({
          type: GET_PRODUCTS_ERROR,
          payload: error.payload
      })
  });
  
}

export const addProducts = (body) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT,    
  });
  return await api.addProducts(body)
    .then((p) => {
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: p.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_PRODUCT_ERROR,
        payload: err.response,
      });
    });
};

export const deleteProduct = (payload) => 
  async(dispatch) => {
    return await api.deleteProduct(payload)
      .then(() => {
      dispatch({
        type: DELETE_PRODUCT,
        payload
      })
    })
  .catch((error) => console.log(error))
}


export const editProduct = (payload) => async(dispatch) => {
    return await api.editProduct(payload)
      .then((product) => {
        dispatch({
          type: EDIT_PRODUCT,
          payload: product.data
        })
    })
    .catch((error) => console.log(error))
}

