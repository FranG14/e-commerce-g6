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

const { REACT_APP_API } = process.env;


export const getCategories = (page) => {
	return function (dispatch) {
		return axios.get(`https://e-commerce-g6-back.herokuapp.com/categories?pageNumber=`+page)
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
		return axios.get(`https://e-commerce-g6-back.herokuapp.com/categories?keyword=`+name)
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
		return axios.get(`https://e-commerce-g6-back.herokuapp.com/categories/productCategory/${payload}`)
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
		return axios.post(`https://e-commerce-g6-back.herokuapp.com/categories`, payload)
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
		return axios.put(`https://e-commerce-g6-back.herokuapp.com/categories/${payload.id}`, payload)
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
		return axios.delete(`https://e-commerce-g6-back.herokuapp.com/categories/${payload}`)
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