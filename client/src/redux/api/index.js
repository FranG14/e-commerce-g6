import axios from 'axios';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea

const API = axios.create( { baseURL: REACT_APP_API} ) 

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})
//AUTHENTICATION
export const getUserById = (_id) => API.get(`/users/${_id}`);
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const googleLogIn = (formData) => API.post('users/google',formData);
export const changePassword = (passwords, _id) => API.patch(`/users/password/${_id}`, passwords);
export const updateUser = (userBody, _id) => API.put(`users/${_id}`);


//CART
//Trae el cart activo de un usuario particular
export const getActiveCartFromUser = (userId) => API.get(`/carts/active/${userId}`);
//Trae todos los carts de todos los usuarios (Con paginado por query)
export const getAllCarts = () => API.get('/carts/');
//Trae todo el historial de carts de un usuario (Con paginado por query)
export const getCartsByUser = () => API.get('/carts/userId');
//Agrega un item al cart activo de un usuario. Ejemplo de body: 
//{"productId":"60a0896ee2e38c2fa0b2fe74","quantity": "5"}
//En caso de ingresarse un productId que ya esté en el cart, se reemplaza la cantidad vieja por la nueva 
//(diganme si prefieren que se sumen)
export const addItem = (product, userId) => API.post(`/carts/${userId}`, product)
//Remueve un producto por completo del cart de un usuario. Ejemplo de body : {"productId": "60a0896ee2e38c2fa0b2fe74"}
export const removeProductFromCart = (product, userId) => API.patch(`/carts/remove/${userId}`,product);
//Cambia el estado de un cart de un usuario. Ejemplo de body: {"state": "cancelled"}
export const changeCartState = (state, userId) => API.patch(`/carts/${userId}`, state);
//Decrementa por uno la cantidad de un producto del cart. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede decrementar por debajo de 0
export const decrementProductUnit = (product, userId) => API.patch(`/carts/decrement/${userId}`,product);
//Incrementa por uno la cantidad de un producto del cart. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede aumentar por encima del stock
export const incrementProductUnit = (product, userId) => API.patch(`/carts/increment/${userId}`,product)
