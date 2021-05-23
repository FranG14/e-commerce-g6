import { 
    GET_ACTIVE_CART_FROM_USER, GET_ALL_CARTS, GET_CARTS_BY_USER,
    ADD_TO_CART, REMOVE_PRODUCT_FROM_CART,
    CHANGE_CART_STATE,
    DECREMENT_PRODUCT_UNIT, INCREMENT_PRODUCT_UNIT, ADD_ITEM
} from '../constants/';
import * as api from '../api/index.js';

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
export const addItem = (productBody, userId) => async(dispatch) => {
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