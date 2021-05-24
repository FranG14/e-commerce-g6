import { 
    REGISTER, REGISTER_SUCCESS, REGISTER_ERROR, 
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, 
    GET_USER_BY_ID,
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, 
    GOOGLE_LOGIN, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_ERROR, 
    CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR,
} from '../constants/';

import * as api from '../api/index.js';

//=====================================================================================//
export const login = (formData, history) => async (dispatch) => {
    dispatch({
        type: LOGIN
    });
    return await api.login(formData)
    .then((u)=>{
        dispatch({
            type: LOGIN_SUCCESS,
            payload: u.data
        })
        localStorage.setItem('profile', JSON.stringify(u.data))
    })
    // .then(history.push('/'))
    .catch ((error) => {
        dispatch({
            type:LOGIN_ERROR,
            payload:error.response.data,
        });
    });
};
//=====================================================================================//
export const register = (formData, history) => async (dispatch) => {
    dispatch({
        type: REGISTER
    });
    return await api.register(formData)
    .then((u)=>{
        dispatch({
            type: REGISTER_SUCCESS,
            payload: u.data
        })
        localStorage.setItem('profile', JSON.stringify(u.data))
    })
    // .then(history.push('/'))
    .catch((error)=> {
        dispatch({
            type:REGISTER_ERROR,
            payload: error.response.data
        })
    })
}
//=====================================================================================//
export const getUserById = (_id) => async(dispatch) => {
    try {
        const { data } = await api.getUserById(_id);
        dispatch({type: GET_USER_BY_ID, payload: data});
    } catch (error) {
        console.log(error)
    }
}
//=====================================================================================//
export const googleLogIn = (formData, history) => async(dispatch) => {
    dispatch({
        type: GOOGLE_LOGIN
    });
    return await api.googleLogIn(formData)
    .then((u)=>{
        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: u.data
        })
        localStorage.setItem('profile', JSON.stringify(u.data))
    })
    // .then(history.push('/'))
    .catch((error)=>{
        dispatch({
            type:GOOGLE_LOGIN_ERROR,
            payload: error.response.data
        })
    })
}
//=====================================================================================//
export const changePassword = (passwords, history) => async(dispatch) => {
    dispatch({
        type: CHANGE_PASSWORD
    });
    return await api.changePassword(passwords)
    .then((p)=>{
        console.log("A ver qué onda esto",p.data)
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: p.data
        })
        localStorage.setItem('profile', JSON.stringify(p.data))
    })
    .then(()=> history.push('/'))
    .catch((error)=>{
        dispatch({
            type: CHANGE_PASSWORD_ERROR,
            payload: error.response.data
        })
    })
}
//=====================================================================================//
export const updateUser = (userBody, _id) => async(dispatch) => {
    dispatch({
        type: UPDATE_USER
    })
    return await api.updateUser(userBody, _id)
    .then((updated)=>{
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: updated.data
        })
        localStorage.setItem('profile', JSON.stringify(updated.data))
    }).catch((error)=>{
        dispatch({
            type: UPDATE_USER_ERROR,
            payload: error.response.data
        })
    })
}