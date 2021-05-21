import axios from 'axios';
import {
	GET_USER_ID,
	EDIT_USER,
	GET_USERS,
	DELETE_USER,
	GET_ERROR_USER,
	SEARCH_USER,
	ADMIN_USER,
	GET_ERROR_ADMIN
} from '../constants';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea


export const getUsers = (page) => {
	return function (dispatch) {
		return axios.get(`${REACT_APP_API}users?page=`+ page)
			.then((user) => {
				dispatch(
					{
						type: GET_USERS,
						payload: user.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_USERS,
                    id: err.response,
				})
			})
	}
}

export const searchUser = (payload) => {
	return function (dispatch) {
		return axios.get(`${REACT_APP_API}users?keyword=`+ payload)
			.then((user) => {
				dispatch(
					{
						type: SEARCH_USER,
						payload: user.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: SEARCH_USER,
                    id: err.response,
				})
			})
	}
}

export const getUserById = (id) => {
	return function (dispatch) {
		return axios.get(`${REACT_APP_API}users/${id}`)
			.then((user) => {
				dispatch(
					{
						type: GET_USER_ID,
						payload: user.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_ID,
                    id: err.response,
				})
			})
	}
}
export const editUser = (payload) => {
	return function (dispatch) {
		return axios.put(`${REACT_APP_API}users/${payload.id}`, payload)
			.then((userEdit) => {
				dispatch(
					{
						type: EDIT_USER,
						payload: userEdit.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: EDIT_USER,
                    payload: err.response,
				})
			})
	}
}

export const deleteUser = (payload) => {
	return function (dispatch) {
		return axios.delete(`${REACT_APP_API}users/${payload}`)
			.then((users) => {
				dispatch(
					{
						type: DELETE_USER,
						payload: users.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_ERROR_USER,
                    payload: err.response,
				})
			})
	}
}

export const toggleAdmin = (payload) => {
	return function (dispatch) {
		return axios.put(`${REACT_APP_API}users/toggle/${payload}`)
			.then((users) => {
				dispatch(
					{
						type: ADMIN_USER,
						payload: users.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_ERROR_ADMIN,
                    payload: err.response,
				})
			})
	}
}




