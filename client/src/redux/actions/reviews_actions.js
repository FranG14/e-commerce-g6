import axios from 'axios';
import { 
  ADD_REVIEW, 
  ADD_REVIEW_ERROR, 
  ADD_REVIEW_SUCCESS, 
  GET_ALL_REVIEWS, 
  GET_REVIEW_ERROR, 
  GET_REVIEW_SUCCESS 
} from '../constants';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea

export const getAllReviews = (page) => async (dispatch) => {
    dispatch({
      type: GET_ALL_REVIEWS,
    });
    return await axios
    .get(`${REACT_APP_API}reviews?page=${page}`)
    .then((res) => {
      console.log("REVIEW ACTION",res.data)
      dispatch({
        type: GET_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_REVIEW_ERROR,
        payload: err.response,
      });
    });
};

export const addReviews = (body) => async (dispatch) => {
  dispatch({
    type: ADD_REVIEW,    
  });
  return await axios
    .post(`${REACT_APP_API}products`, body)
    .then((p) => {
      dispatch({
        type: ADD_REVIEW_SUCCESS,
        payload: p.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_REVIEW_ERROR,
        payload: err.response,
      });
    });
};