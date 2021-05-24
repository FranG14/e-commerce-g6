import {
    ADD_TO_CART,
    DEL_FROM_CART,
    BUY,

    ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, 
    GET_ACTIVE_CART_FROM_USER, GET_ACTIVE_CART_FROM_USER_SUCCESS, GET_ACTIVE_CART_FROM_USER_ERROR
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
        return {...state, cart:action.payload, isLoading: false, error:true}
      
      //======REDUCER VIEJO (A DEPRECAR)======// 
      case ADD_TO_CART:
        return { cart: [...state.cart,action.payload] };
      case DEL_FROM_CART:
        return { cart: state.cart.filter((producto)=>{
            if(producto.name===action.payload.name){
                return false;
            }else{
                return true;
            }
        })}
      case BUY:
        return {
          cart:action.payload
        }

      default:
        return state;
    }
};
  
export default cartReducer;
  