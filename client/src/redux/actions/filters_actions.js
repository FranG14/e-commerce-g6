import axios from "axios";
import{
    FILTER_BY_PRICE,
    FILTER_BY_CATEGORY,
    FILTER_BY_NAME,
} from "../constants";

const { REACT_APP_API } = process.env;

export const filterByName = (filterName,filter) => {
    return function (dispatch) {
        return axios.get(`https://e-commerce-g6-back.herokuapp.com/products/${filterName}?${filterName}=${filter}`)
          .then((res) => {
            dispatch(
              {
                type: FILTER_BY_NAME,
                payload: res.data
              }
            )
          })
          .catch((error) => console.log(error))
      }

}

export const filterByPrice = (maxPrice,minPrice) => {
    return function (dispatch) {
        return axios.get(`https://e-commerce-g6-back.herokuapp.com/products/price?maxPrice=${maxPrice}&minPrice=${minPrice}`)
          .then((res) => {
            dispatch(
              {
                type: FILTER_BY_PRICE,
                payload: res.data
              }
            )
          })
          .catch((error) => console.log(error))
      }
}

export const filterByCategory = (name) => {
    return function (dispatch) {
        return axios.get(`https://e-commerce-g6-back.herokuapp.com/products/category/${name}`)
          .then((res) => {
            dispatch(
              {
                type: FILTER_BY_CATEGORY,
                payload: res.data
              }
            )
          })
          .catch((error) => console.log(error))
      }
}

