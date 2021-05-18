import { GET_USER_ID ,EDIT_USER, GET_USERS, DELETE_USER, SEARCH_USER, ADMIN_USER} from './../constants';

const initialState = {
	user: {
		
		list: [],
		category: {},
		error: false
	}
};

const userReducer = (state = initialState, action) => {

	switch (action.type) {
		case GET_USER_ID:
			
			console.log(action);
			return {
				...state,
				user: {
					...state.user,
					list: action.payload
				}
			}
		case GET_USERS:
			return {
				...state,
				user: {
					...state.user,
					list: action.payload
				}
			}
		case EDIT_USER:
			console.log(action.payload)	
			return {
				...state,
				user: {
					...state.user,
					list: (state.user.list.userFound.id === action.payload.id)? action.payload
						:" "
					
				}
			}
		
	/* 	case EDIT_USER:
			return {
				...state,
				user: {
					...state.user,
					list: state.user.list.map(el => {
						if (el.id === action.payload.id) {
							return action.payload;
						}
						return el;
					})
				}
			} */
		case DELETE_USER:
			return {
				...state,
				user: {
					...state.user,
					list: state.user.list.filter(user => user.id !== action.payload.id)
				}
			}
		case SEARCH_USER:
			return {
				...state,
				user: {
					...state.user,
					list: action.payload
				}
			}
		case ADMIN_USER:
			console.log(action.payload)	
			return {
				...state,
				user: {
					...state.user,
					list: (state.user.list.id === action.payload.id)? action.payload
						:" "
					
				}
			}
		default: return state;
	}
}

export default userReducer;