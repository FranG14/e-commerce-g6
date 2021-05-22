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
export const getUserById = () => API.get('/users/:id');
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const googleLogIn = (formData) => API.post('users/google',formData);
export const changePassword = (passwords) => API.patch('/users/password/:_id', passwords);

//CART
/* Escrito por Germán
Acá agregamos todas las actions para las carts(relativo al carrito, 
pasa que no le quise poner carrito para no pisar variables/funciones)
En este módulo se pueden ir agregando todas las actions que se comunican con el back, 
cosa de tener todo bien modularizado. Lo usé para las rutas de autenticación y ahora sumamos las rutas de order.
Por hoy (21/05) el esquema de order sólo tiene los componentes "básicos" del mismo. Eso es porque queríamos primero
testear las acciones básicas del CRUD de la order: 
    -userId: Cada order guardada en el back tiene un id equivalente al usuario al cual pertenece. En caso de que 
    el usuario no esté logueado la orden puede guardarse en localStorage, como bien señaló Mati. 
    Yo en su momento programé la parte que guarda el usuario logueado en el localStorage, 
    así que de última podemos ver eso por Discord en el finde. En el momento de cargar el primer elemento en la order,
    el código debería comprobar que haya un usuario logueado en el localStorage (propiedad 'profile') o en el store.
    Si no lo hay, debería ir guardándose en el localStorage la order. Antes de poder finalizar la compra, el usuario
    debería poder loguearse, y ahí toda la order pasa al back.
    -items: array con todos los productos de la orden, traídos por el id de los productos. 
    También tiene el nombre, el precio y la cantidad de cada producto en la order.
    -totalAmount: Precio total (todavía no estoy sumando descuento, eso lo vemos mañana, con el tema de mercado pago)
    -state: estado de la orden. Por ahora hay tres: active, completed y cancelled. Me parece que no son necesarias más, 
    pero ustedes me dicen. Cada usuario sólo puede tener una sola order activa. 
*/

//Trae la order activa de un usuario particular
export const getActiveCartFromUser = () => API.get('/active/:userId');
//Trae todas las carts de todos los usuarios (Con paginado por query)
export const getAllCarts = () => API.get('/carts/');
//Trae todo el historial de carts de un usuario (Con paginado por query)
export const getCartsByUser = () => API.get('/carts/userId');
//Agrega un item a la order activa de un usuario. Ejemplo de body: 
//{"productId":"60a0896ee2e38c2fa0b2fe74","quantity": "5"}
//En caso de ingresarse un productId que ya esté en la order, se reemplaza la cantidad vieja por la nueva 
//(diganme si prefieren que se sumen)
export const addItem = (product) => API.post('/carts/:userId', product)
//Remueve un producto por completo de la order de un usuario. Ejemplo de body : {"productId": "60a0896ee2e38c2fa0b2fe74"}
export const removeProductFromCart = (product) => API.patch('/carts/remove/:userId',product);
//Cambia el estado de una order de un usuario. Ejemplo de body: {"state": "cancelled"}
export const changeCartState = (state) => API.patch('/carts/:userId', state);
//Decrementa por uno la cantidad de un producto de la order. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede decrementar por debajo de 0
export const decrementProductUnit = (product) => API.patch('/carts/decrement/:userId',product);
//Incrementa por uno la cantidad de un producto de la order. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede aumentar por encima del stock
export const incrementProductUnit = (product) => API.patch('/carts/increment/:userId',product)