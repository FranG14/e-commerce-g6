import axios from "axios";
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


const { REACT_APP_API } = process.env;

export const getAllProducts = (page) => async (dispatch) => {
  dispatch({
    type: GET_ALL_PRODUCTS,
  });
  return await axios
    .get(`${REACT_APP_API}products?page=${page}`)
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

export function searchProducts(name) {
  return function (dispatch) {
    return axios.get(`${REACT_APP_API}products?keyword=`+name)
      .then((res) => {
        dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
      })

      .catch((error) => console.log(error));
  };
}

export function detailProduct(id) {
  return function (dispatch) {
    return axios.get(`${REACT_APP_API}products/detail/`+id)
      .then((res) => {
        dispatch({ type: DETAIL_PRODUCT, payload: res.data });
      })
      .catch((error) => {
        dispatch({
          type: GET_PRODUCTS_ERROR,
          payload: error.payload
        })
      });
  };
}

export const addProducts = (body) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT,    
  });
  return await axios
    .post(`${REACT_APP_API}products`, body)
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

export const deleteProduct = (payload) => {
  return function (dispatch) {
    return axios.delete(`${REACT_APP_API}products/${payload}`)
      .then(() => {
        dispatch(
          {
            type: DELETE_PRODUCT,
            payload
          }
        )
      })
      .catch((error) => console.log(error))
  }
}

export const editProduct = (payload) => {
  return function (dispatch) {
    return axios.put(`${REACT_APP_API}products/${payload.id}`, payload.data)
      .then((product) => {
        dispatch(
          {
            type: EDIT_PRODUCT,
            payload: product.data
          }
        )
      })
      .catch((error) => console.log(error))
  }
}
