import {
    ADD_TO_CART,
    DEL_FROM_CART,
    BUY,

<<<<<<< HEAD
    ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, 
    GET_ACTIVE_CART_FROM_USER, GET_ACTIVE_CART_FROM_USER_SUCCESS, GET_ACTIVE_CART_FROM_USER_ERROR
=======
    ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR,
    DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_ERROR, 
    GET_ACTIVE_CART_FROM_USER, GET_ACTIVE_CART_FROM_USER_SUCCESS, GET_ACTIVE_CART_FROM_USER_ERROR, CHANGE_CART_STATE, CHANGE_CART_STATE_SUCCESS, CHANGE_CART_STATE_ERROR
>>>>>>> 64af3d5621bccba56b55f0b1b19431e4453d14e7
} from "../constants";
//{name:"test",price:100,brand:"a"},{name:"test2",price:100,brand:"a"}
const initialState = {
    cart: null,
    cartsList: null,
    isLoading: false,
    error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, cart: null, isLoading:true, error:null}
      case ADD_ITEM_SUCCESS:
        return {...state, cart: action.payload, isLoading: false, error:null}
      case ADD_ITEM_ERROR:
          return {...state, cart: action.payload, isLoading: false, error:true}
      case GET_ACTIVE_CART_FROM_USER:
        return {...state, cart: null, isLoading: true, error:null}
      case GET_ACTIVE_CART_FROM_USER_SUCCESS:
        return {...state, cart: action.payload, isLoading: false, error:false}
      case GET_ACTIVE_CART_FROM_USER_ERROR:
        return {...state, isLoading: false, error:action.payload}
      case DELETE_ITEM:
        return {...state, isLoading: true, error: null}
      case DELETE_ITEM_SUCCESS:
        return {...state, cart:action.payload, isLoading: false, error: null}
      case DELETE_ITEM_ERROR:
        return {...state, isLoading: false, error: action.payload}
      case CHANGE_CART_STATE:
        return {...state, isLoading: true, error:null}
      case CHANGE_CART_STATE_SUCCESS:
        return {...state, cart:action.payload, isLoading:false, error:null}
      case CHANGE_CART_STATE_ERROR:
        return {...state, isLoading:false, error:action.payload}
      
      //======REDUCER VIEJO (A DEPRECAR)======// 
      case ADD_TO_CART:
        return { cart: [...state.cart,action.payload] };
      case DELETE_ITEM:
        console.log("entra al delete")
			return {...state,
         cart:action.payload, isLoading: false, error:false}
      case BUY:
        return {
          cart:action.payload
        }

      default:
        return state;
    }
};
  
export default cartReducer;
  