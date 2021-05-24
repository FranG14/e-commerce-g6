import { 
    GET_ACTIVE_CART_FROM_USER, GET_ACTIVE_CART_FROM_USER_SUCCESS, GET_ACTIVE_CART_FROM_USER_ERROR,
    GET_ALL_CARTS, GET_CARTS_BY_USER,
    ADD_TO_CART, 
    REMOVE_ITEM, REMOVE_ITEM_SUCCESS, REMOVE_ITEM_ERROR,
    CHANGE_CART_STATE, CHANGE_CART_STATE_SUCCESS, CHANGE_CART_STATE_ERROR,
    DECREMENT_PRODUCT_UNIT, DECREMENT_PRODUCT_UNIT_SUCCESS, DECREMENT_PRODUCT_UNIT_ERROR,
    INCREMENT_PRODUCT_UNIT, INCREMENT_PRODUCT_UNIT_SUCCESS, INCREMENT_PRODUCT_UNIT_ERROR,
    ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR
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
        localStorage.setItem('cart', JSON.stringify(active.data))
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
export const removeProductFromCart = (product, userId) => async(dispatch) =>{
    dispatch({
        type: REMOVE_ITEM
    })
    return await api.removeProductFromCart(product,userId)
    .then((cart) => {
        dispatch({
            type: REMOVE_ITEM_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error) => {
        dispatch({
            type: REMOVE_ITEM_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const changeCartState = (state, userId) => async(dispatch) => {
    dispatch({
        type: CHANGE_CART_STATE
    })
    return await api.changeCartState(state,userId)
    .then((cart)=>{
        dispatch({
            type: CHANGE_CART_STATE_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: CHANGE_CART_STATE_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const decrementProductUnit = (product, userId) => async(dispatch) => {
    dispatch({
        type: DECREMENT_PRODUCT_UNIT
    })
    return await api.decrementProductUnit(product,userId)
    .then((cart)=>{
        dispatch({
            type: DECREMENT_PRODUCT_UNIT_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: DECREMENT_PRODUCT_UNIT_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
export const incrementProductUnit = (product, userId) => async(dispatch) => {
    dispatch({
        type: INCREMENT_PRODUCT_UNIT
    })
    return await api.incrementProductUnit(product,userId)
    .then((cart)=>{
        dispatch({
            type: INCREMENT_PRODUCT_UNIT_SUCCESS,
            payload: cart.data
        })
        localStorage.setItem('cart', JSON.stringify(cart.data))
    }).catch((error)=>{
        dispatch({
            type: INCREMENT_PRODUCT_UNIT_ERROR,
            payload: error.response.data
        })
    })
}
//=============================================//
