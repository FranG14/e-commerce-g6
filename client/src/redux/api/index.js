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
/* Escrito por Germán 22/05


Acá agregamos todas las actions para los carts manejados desde el backend.

En este módulo se pueden ir agregando todas las actions que se comunican con el back, 
cosa de tener todo bien modularizado. 

Lo usé para las rutas de autenticación y ahora sumamos las rutas de order.

Hasta el momento, el cart que juntaba todas las orders de un usuario se manejaba en un store de Redux.

Para agregar Mercado Pago, nos dimos cuenta que es necesario incorporar el Cart en el Back también.

Con Juli analizamos varios modelos, vimos varios ejemplos en repos de Git, y fuimos armando uno en base a lo que más nos gustaba de cada uno.

Ayer pensaba sobreescribir todo lo relativo a Order en el back para amoldarse a este esquema, pero me dí cuenta que le iba a traer muchos problemas a ustedes, así que pensé armar un nuevo esquema "Cart" en el back, con sus respectivas routes y controllers. Va a ser necesario ir cambiando el esquema de Order para adaptarlo a Cart.

Por ahora el esquema de cart sólo tiene los componentes "básicos" del mismo. 
Eso es porque queríamos primero testear las acciones básicas del CRUD del cart.
Ni bien esté aprobado el merge en dev de esta rama, empiezo a incorporar mercado pago.
Las propiedades del esquema Cart en el Back son:

    -userId: Cada cart guardado en el back tiene un id equivalente al usuario al cual pertenece. En caso de que el usuario no esté logueado la orden puede guardarse en localStorage, como bien señaló Mati. 
    Yo en su momento programé la parte que guarda el usuario logueado en el localStorage, así que de última podemos ver eso por Discord en estos días. En el momento de cargar el primer elemento al cart, el código debería comprobar que haya un usuario logueado en el localStorage (propiedad 'profile') o en el store.
    Si no lo hay, debería ir guardándose en el localStorage el cart. Antes de poder finalizar la compra, el usuario debería poder loguearse, y ahí todo el cart pasa al back.
    -items: array con todos los productos del cart, traídos por el id de los productos. 
    También tiene el nombre, el precio y la cantidad de cada producto.
    -totalAmount: Precio total (todavía no estoy sumando descuento)
    -state: estado del cart. Por ahora hay tres: active, completed y cancelled. Me parece que no son necesarias más, pero ustedes me dicen. Cada usuario sólo puede tener un solo cart activo. 
*/

//Trae el cart activo de un usuario particular
export const getActiveCartFromUser = () => API.get('/active/:userId');
//Trae todos los carts de todos los usuarios (Con paginado por query)
export const getAllCarts = () => API.get('/carts/');
//Trae todo el historial de carts de un usuario (Con paginado por query)
export const getCartsByUser = () => API.get('/carts/userId');
//Agrega un item al cart activo de un usuario. Ejemplo de body: 
//{"productId":"60a0896ee2e38c2fa0b2fe74","quantity": "5"}
//En caso de ingresarse un productId que ya esté en el cart, se reemplaza la cantidad vieja por la nueva 
//(diganme si prefieren que se sumen)
export const addItem = (product) => API.post('/carts/:userId', product)
//Remueve un producto por completo del cart de un usuario. Ejemplo de body : {"productId": "60a0896ee2e38c2fa0b2fe74"}
export const removeProductFromCart = (product) => API.patch('/carts/remove/:userId',product);
//Cambia el estado de un cart de un usuario. Ejemplo de body: {"state": "cancelled"}
export const changeCartState = (state) => API.patch('/carts/:userId', state);
//Decrementa por uno la cantidad de un producto del cart. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede decrementar por debajo de 0
export const decrementProductUnit = (product) => API.patch('/carts/decrement/:userId',product);
//Incrementa por uno la cantidad de un producto del cart. Ejemplo de body:  {"productId": "60a0896ee2e38c2fa0b2fe74"}
//No se puede aumentar por encima del stock
export const incrementProductUnit = (product) => API.patch('/carts/increment/:userId',product)
