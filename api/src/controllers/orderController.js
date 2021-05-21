const Order = require('./../models/Order');
const Product = require ('./../models/Product')

//==========================================================================//
const addCartItem = async(req, res) => {
    const {userId} = req.params;
    const { productId, quantity } = req.body;

    try{
        let order = await Order.findOne({$and:[{userId}, {state:'processing'}]});

        let newItem = await Product.findOne({_id: productId})
        
        if(!newItem) return res.status(404).json({message:'Product not found'})
        
        const price = newItem.price;
        const name = newItem.name;

        if(order){
            let itemIndex = order.items.findIndex((i) => i.productId === productId);
            console.log(itemIndex)
            if(itemIndex > -1){
                console.log("Found!")
                let productItem = order.items[itemIndex]
                productItem.quantity = quantity;
                order.items[itemIndex] = productItem;
            }
            else {
                console.log("Not found")
                order.items.push({productId, name, quantity, price})
            }

            order.totalAmount += quantity*price;
            order = await order.save()
            return res.status(201).json({order})
        
        }
        else {
            const newOrder = await Order.create({
                userId,
                items: [{productId, name, quantity, price}],
                totalAmount: quantity*price
            });
            return res.status(201).json({newOrder})
        }
    } catch(error){
        console.log(error);
        res.status(500).json({message:'There was and error'})
    }

}
//==========================================================================//
const stateChange = async(req, res) => {
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
        res.status(500).json({message:'There was and error'})
    }    
}
//==========================================================================//
const getAllOrders = async(req, res) => {
    return res.status(200).json({message:'ALL OK'})
}
//==========================================================================//

module.exports = {
    addCartItem,
    stateChange,
    getAllOrders
}


























//==========================================================================//
module.exports = {
    addCartItem,
//  getAllOrders,
//  getOrderById,
//  addOrderlistToOrder,
//  removeOrderlistFromOrder,
//  updateOrder

}



// const getAllOrders = async(req,res) => {
//     const pageSize = req.query.pageSize || 15;
//     const page = req.query.page || 1;

//     /*
//         agregar keyword para usuario
//     */

//     const orders = await Order.find()
//     .populate('orderlists')
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

// res.json({ orders, page, pages: Math.ceil(count / pageSize)});

// }
// //==========================================================================//
// const getOrderById = async(req,res) => {
//     const {_id} = req.params;
//     const orderFound = await Order.findOne({_id});
//     if(!orderFound) return res.status(404).json({message:'Order not Found'});
//     return res.status(200).json({orderFound});
// }
// //==========================================================================//

// /*
// Esta función debería ejecutarse en el momento en que se agregue la primera 
// orden al carrito. En ese momento vamos a crear un nuevo Order con el id del 
// usuario logueado (si es que hay), y la primera orden. 
// Para agregar más ordenes a este carrito, vamos a usar el 
// controller addOrderlistToOrder
// */


// const createOrder = async(req,res) => {
//      const {
//         user,
//         mercadopagoId,
//         discount,
//         paymentMethod
//     } = req.body

//     if(!req.body) res.status(403).end()
    
//     try{
//         const result = await Order.create({
//             _id:new mongoose.Types.ObjectId(),
//             user,
//             mercadopagoId,
//             discount,
//             paymentMethod
//             }
//         )
//         res.status(201).json(result)       
//     } catch(error){
//         console.log(error)
//         res.status(500).json({message:"Something went wrong"}); 
//     }


// }
// //==========================================================================//

// /*
// Cuando creo una orden, ademas de crearla hay que agregarla al carrito. Entonces necesitamos agregarla
// */

// const addOrderlistToOrder = async(req, res) => {
//     const {_id} = req.params;
//     const {newOrder} = req.body;

//     const foundOrder = Order.findOne({_id}, function(error, orderUpdated){
//         if(error){
//             return res.status(400).json({message:'There was an error'})
//         }
//         if(!orderUpdated) return res.status(404).json({message:'Order Not Found'})

//         orderUpdated.orders = [...orderUpdated.orders, newOrder]

//         orderUpdated.save(function(error){
//             if(error){
//                 return res.status(400).json({message: 'There was an Error while adding a new order to the Order'})
//             }
//             res.status(200).json({orderUpdated})
//         })
//     })
// }

// //==========================================================================//

// /*
//  Que pasa si elimino una orden, pero su id sigue en el carrito? Entonces no solo elimino la orden con el controller de la order, sino que también debería sacar el id del Order
// */
// const removeOrderlistFromOrder = async(req, res) =>{
//     const {_id} = req.params;
//     const {orderid} = req.body;

//     const foundOrder = Order.findOne({_id}, function(error, orderUpdated){
//         if(error){
//             return res.status(400).json({
//                 message: 'There was an error'
//             })
//         }
//         if(!orderUpdated) return res.status(404).json({message:'Order Not Found'})

//         orderUpdated.orders = orderUpdated.orders.filter((order)=>order._id !== orderid)

//         orderUpdated.save(function(error){
//             if(error){
//                 return res.status(400).json({
//                     message: "There was an Error while removing the order id of the removed order"
//                 })
//             }
//             res.status(200).json({orderUpdated})
//         })
//     })
// }
// //==========================================================================//
// const statesArray = ["created", "pending", "cancel", "process", "completed"];

// const updateOrder = async(req, res) => {
//     const {_id} = req.params;
//     const {newState} = req.body;

//     if(!statesArray.includes(newState)) return res.status(400).json({message:'State not valid'})

//     const foundOrder = Order.findOne({_id}, function(error, orderUpdated){
//         if(error) return res.status(400).json({message:'There was an error'});
//         if(!orderUpdated) return res.status(404).json({message:'Order Not Found'})

//         orderUpdated.state = newState

//         orderUpdated.save(function(error){
//             if(error){return res.status(400).json({message: 'There was and Error while cancelling the Order'})}
//             return res.status(200).json({orderUpdated})
//             })
//         }
//     )
// }



