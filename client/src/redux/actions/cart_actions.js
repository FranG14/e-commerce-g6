import { 
    GET_ACTIVE_CART_FROM_USER, GET_ALL_CARTS, GET_CARTS_BY_USER,
    ADD_TO_CART, REMOVE_PRODUCT_FROM_CART,
    CHANGE_CART_STATE,GET_ACTIVE_CART_FROM_USER_SUCCESS,
    DECREMENT_PRODUCT_UNIT, INCREMENT_PRODUCT_UNIT, ADD_ITEM,
    ADD_ITEM_ERROR, ADD_ITEM_SUCCESS,
    GET_CART_FROM_USER, DELETE_ITEM, GET_ERROR_ITEM_DELETE,GET_ACTIVE_CART_FROM_USER_ERROR
} from '../constants/';
import * as api from '../api/index.js';
import axios from 'axios';

export function addToCart(obj) {
    return {
        type: "ADD_TO_CART",
        payload: obj
    };
}

export function delFromCart(obj) {
    return {
        type: "DEL_FROM_CART",
        payload: obj
    };
}

export function buy(){
    return {
        type: "BUY",
        payload: []
    };
}

//=============================================//
export const getActiveCartFromUser = (userId) => async(dispatch) => {
    console.log("entro a la primera")
    dispatch({
        type: GET_ACTIVE_CART_FROM_USER
    });
    return await api.getActiveCartFromUser(userId)
    .then((active)=>{
        dispatch({
            type: GET_ACTIVE_CART_FROM_USER_SUCCESS,
            payload: active.data
        })
        //localStorage.setItem('cart', JSON.stringify(active.data))
    })
    .catch((error)=> {
        dispatch({
            type: GET_ACTIVE_CART_FROM_USER_ERROR,
            payload: error.response.data,
        })
    })
}

//=============================================//
export const addItem = (productBody, userId) => async (dispatch) => {
    // console.log("DENTRO DEL ACTION",productBody)
    dispatch({
        type: ADD_ITEM
    })
    return await api.addItem(productBody, userId)
    .then((cart)=>{
        dispatch({
            type:ADD_ITEM_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: ADD_ITEM_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const getCartFromUser = (id) => {
// console.log("entra al action,",id)
	return function (dispatch) {
		return axios.get(`http://localhost:3000/carts/active/`+ id)
			.then((cart) => {
				dispatch(
					{
						type: GET_ACTIVE_CART_FROM_USER_SUCCESS,
						payload: cart.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_CART_FROM_USER,
                    id: err.response,
				})
			})
	}
}
//=============================================//
export const deleteItem = (id, productId) => {
    //console.log("id product", productId)
	return function (dispatch) {
		return axios.put(`http://localhost:3000/carts/remove/`+ id + '/'+ productId)
            .then((cart) => {
                // console.log("+++++++",cart)
				dispatch(
					{
						type: DELETE_ITEM,
						payload: cart.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_ERROR_ITEM_DELETE,
                    payload: err.response,
				})
			})
	}
}
//=============================================//

//=============================================//

//=============================================//