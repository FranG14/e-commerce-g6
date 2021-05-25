const server = require('express').Router();
const Cart = require('./../models/Cart');

const {
    getActiveCartFromUser,
    getAllCarts,
    getCartsByUser,
    addItem,
    stateChange,
    removeProductFromCart,
    incrementProductUnit,
    decrementProductUnit
} = require('../controllers/cartController')

// ------------------------------ ROUTES Cart ---------------------------- //
//==========================================================================//
                //Ruta para obtener todos los carts
//==========================================================================//
server.get('/', getAllCarts)
server.get('/:userId', getCartsByUser)
//==========================================================================//
                //Ruta para obtener un cart por id
//==========================================================================//
// server.get('/:userId', getActiveCartFromUser);
//==========================================================================//
                //Ruta para obtener cart activo del user (o crearlo)
//==========================================================================//
server.get('/active/:userId', getActiveCartFromUser)
//==========================================================================//
                //Ruta para agregar item (producto) al cart
//==========================================================================//
server.post('/:userId', addItem);
//==========================================================================//
                //Ruta para cambiar estado del cart
//==========================================================================//
server.post('/:userId/changestate', stateChange)
server.put('/:userId', stateChange)
//==========================================================================//
                //Ruta para quitar producto al cart 
//==========================================================================//
server.put('/remove/:userId/:productId', removeProductFromCart)
//==========================================================================//
                //Ruta para quitar una unidad a un producto del cart
//==========================================================================//
server.put('/decrement/:userId', decrementProductUnit)
//==========================================================================//
                //Ruta para aumentar una unidad a un producto del cart
//==========================================================================//
server.put('/increment/:userId', incrementProductUnit)
//==========================================================================//

module.exports = server;