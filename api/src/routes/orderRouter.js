const server = require('express').Router();
const Order = require('./../models/Order');


const {
    addCartItem,
    stateChange,
    getAllOrders
} = require('../controllers/orderController')

// ------------------- ROUTES Order ------------------

//Ruta para obtener todos los orders
server.get('/', async(req,res)=>{

});
//Ruta para obtener un order por id
//server.get('/:_id', getOrderById);

//Ruta para crear un order
server.post('/:userId', addCartItem);

//Ruta para cambiar estado de la order
server.patch('/:userId', async(req, res) => {
    const {userId} = req.params;
    const { state } = req.body;

    if(!req.body?.state) {
        return res.status(400).json({message: 'New State not found'});
    }
    // const statesArray = ['processing', 'cancelled']
  
    try{
        let order = await Order.findOne({userId});

        if(order){
            order.state = state; 
            res.status(200).json({message:'Order updated'})           
        } else {
            res.status(400).json({message:'Order not found'})
        }    
    } catch(error){
        console.log(error)
        res.status(500).json({message:'There was and error'})
    }    
})

//Ruta para agregar orden al order
//server.post('/:_id', addOrderlistToOrder)
//Ruta para quitar orden al order
//server.patch('/:_id', removeOrderlistFromOrder)
//Ruta para cancelar order
//server.patch('/state/:_id', updateOrder);
//Ruta para agregar usuario al order


module.exports = server;