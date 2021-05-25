import * as api from '../api/index.js';

import {
	GET_USER_ID,
	EDIT_USER,
	GET_USERS,
	DELETE_USER,
	GET_ERROR_USER,
	SEARCH_USER,
	ADMIN_USER,
	GET_ERROR_ADMIN,
	EDIT_PASSWORD
} from '../constants';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
//const { REACT_APP_API } = process.env; // En deploy comentar esta linea


export const getUsers = (page) => async(dispatch) => {
	return await api.getUsers(page)
	.then((user) => {
		dispatch({
			type: GET_USERS,
			payload: user.data
			})
	})
	.catch((err) => {
		dispatch({
			type: GET_USERS,
        	id: err.response,
		})
	})
}


export const searchUser = (payload) => async(dispatch) => {
	return await api.searchUser(payload)
	.then((user) => {
		dispatch({
			type: SEARCH_USER,
			payload: user.data
		})
	})
	.catch((err) => {
	dispatch({
		type: SEARCH_USER,
        id: err.response,
		})
	})
}


export const getUserById = (id) => async(dispatch) => {
	return await api.getUserById(id)
	.then((user) => {
	dispatch({
			type: GET_USER_ID,
			payload: user.data
			})
		})
		.catch((err) => {
		dispatch({
			type: GET_USER_ID,
        	id: err.response,
		})
	})
}

export const editUser = (payload) => async(dispatch) => {
	return await api.editProduct(payload)
	.then((userEdit) => {
		dispatch({
			type: EDIT_USER,
			payload: userEdit.data
		})
	})
	.catch((err) => {
		dispatch({
			type: EDIT_USER,
        	payload: err.response,
		})
	})
}


export const deleteUser = (payload) => async(dispatch) => {
	return await api.delUser(payload)
	.then((users) => {
		dispatch({
			type: DELETE_USER,
			payload: users.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_USER,
        	payload: err.response,
		})
	})
}


export const toggleAdmin = (payload) => async (dispatch) => {
	return await api.toggleAdmin(payload)
	.then((users) => {
		dispatch({
			type: ADMIN_USER,
			payload: users.data
		})
	})
	.catch((err) => {
		dispatch({
			type: GET_ERROR_ADMIN,
            payload: err.response,
		})
	})
}




export const editPassword = (id, payload) => async(dispatch) => {
	return await api.editPassword(id,payload)
	.then((edit) => {
		dispatch({
			type: EDIT_PASSWORD,
			payload: edit.data
		})
	})
	.catch((err) => {
	dispatch({
		type: EDIT_PASSWORD,
        payload: err.response,
		})
	})
}
