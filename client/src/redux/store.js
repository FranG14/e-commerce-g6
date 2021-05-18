import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import productsReducer from './reducer/products_reducer'
import categoriesReducer from './reducer/category_reducer'
import authenticationReducer from './reducer/authentication_reducer'
import cartReducer from "./reducer/cart_reducer"
import userReducer from "./reducer/user_reducer"



const reducers = combineReducers({
    categoriesReducer,
    productsReducer,
    authenticationReducer,
    cartReducer,
    userReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;
