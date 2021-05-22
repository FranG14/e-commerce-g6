import axios from 'axios';
import {
	GET_CATEGORIES,
	GET_CATEGORY_ID,
	ADD_CATEGORY,
	EDIT_CATEGORY,
	GET_ERROR_CATEGORY,
	DELETE_CATEGORY	,
	SEARCH_CATEGORY,
} from '../constants';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea



export const getCategories = (page) => {
	return function (dispatch) {
		return axios.get(`${REACT_APP_API}categories?pageNumber=`+page)
			.then((categories) => {
				dispatch(
					{
						type: GET_CATEGORIES,
						payload: categories.data
					}
				)
			})
			.catch(err => {
				dispatch({
					type: GET_ERROR_CATEGORY,
                    payload: err.response,
				})
			})
	}
}
export const searchCategory = (name) => {
	return function (dispatch) {
		return axios.get(`${REACT_APP_API}categories?keyword=`+name)
			.then((categories) => {
				dispatch(
					{
						type: SEARCH_CATEGORY,
						payload: categories.data
					}
				)
			})
			.catch(err => {
				dispatch({
					type: GET_ERROR_CATEGORY,
                    payload: err.response,
				})
			})
	}
}

export const getCategoryById = (payload) => {
	return function (dispatch) {
		return axios.get(`${REACT_APP_API}categories/productCategory/${payload}`)
			.then((categories) => {
				dispatch(
					{
						type: GET_CATEGORY_ID,
						payload: categories.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_ERROR_CATEGORY,
                    payload: err.response,
				})
			})
	}
}

export const addCategory = (payload) => {
	return function (dispatch) {
		return axios.post(`${REACT_APP_API}categories/`, payload)
			.then((categories) => {
				dispatch(
					{
						type: ADD_CATEGORY,
						payload: categories.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_ERROR_CATEGORY,
                    payload: err.response,
				})
			})
	}
}

export const editCategory = (payload) => {
	return function (dispatch) {
		return axios.put(`${REACT_APP_API}categories/${payload.id}`, payload)
			.then((categories) => {
				dispatch(
					{
						type: EDIT_CATEGORY,
						payload: categories.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_ERROR_CATEGORY,
                    payload: err.response,
				})
			})
	}
}


export const deleteCategory = (payload) => {
	return function (dispatch) {
		return axios.delete(`${REACT_APP_API}categories/${payload}`)
			.then((categories) => {
				dispatch(
					{
						type: DELETE_CATEGORY,
						payload: categories.data
					}
				)
			})
			.catch((err) => {
				dispatch({
					type: GET_ERROR_CATEGORY,
                    payload: err.response,
				})
			})
	}
}