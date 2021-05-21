const server = require('express').Router();
const Order = require('./../models/Order');


const {
    getActiveOrderFromUser,
    getAllOrders,
    getOrdersByUser,
    addItem,
    stateChange,
    removeProductFromOrder,
    incrementProductUnit,
    decrementProductUnit
} = require('../controllers/orderController')

// ------------------------------ ROUTES Order ---------------------------- //
//==========================================================================//
                //Ruta para obtener todos los orders
//==========================================================================//
server.get('/', getAllOrders)
//==========================================================================//
                //Ruta para obtener un order por id
//==========================================================================//
server.get('/:userId', getOrdersByUser);
//==========================================================================//
                //Ruta para obtener order activa del user (o crearla)
//==========================================================================//
server.get('/active/:userId', getActiveOrderFromUser)
//==========================================================================//
                //Ruta para agregar item (producto) a la orden
//==========================================================================//
server.post('/:userId', addItem);
//==========================================================================//
                //Ruta para cambiar estado de la order
//==========================================================================//
server.patch('/:userId', stateChange)
//==========================================================================//
                //Ruta para quitar producto a la order (PENDIENTE)
//==========================================================================//
server.patch('/remove/:userId', removeProductFromOrder)
//==========================================================================//
                //Ruta para quitar una unidad a un producto de la order
//==========================================================================//
server.patch('/decrement/:userId', decrementProductUnit)
//==========================================================================//
                //Ruta para aumentar una unidad a un producto de la order
//==========================================================================//
server.patch('/increment/:userId', incrementProductUnit)
//==========================================================================//


module.exports = server;