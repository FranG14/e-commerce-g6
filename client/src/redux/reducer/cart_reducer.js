import {
    ADD_TO_CART,
    DEL_FROM_CART,
    BUY,
} from "../constants";
//{name:"test",price:100,brand:"a"},{name:"test2",price:100,brand:"a"}
const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
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
  