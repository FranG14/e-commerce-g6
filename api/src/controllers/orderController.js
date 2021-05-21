const { ObjectId } = require('bson');
const Order = require('./../models/Order');
const Product = require ('./../models/Product')

//==========================================================================//
const getActiveOrderFromUser = async(req, res)=> {
    const {userId} = req.params;
    let order = await Order.findOne({$and:[{userId}, {state:'active'}]});

    if(!order){
        const newOrder = await Order.create({
            userId,
            items:[],
            totalAmount: 0
        });
        return res.status(201).json({newOrder})
    }

    return res.status(200).status({order})
}
//==========================================================================//
const addItem = async(req, res) => {
    const {userId} = req.params;
    const { productId, quantity } = req.body;

    try{
        let order = await Order.findOne({$and:[{userId}, {state:'active'}]});

        let newItem = await Product.findOne({_id: productId})
        
        if(!newItem) return res.status(404).json({message:'Product not found'})
        
        const price = newItem.price;
        const name = newItem.name;

        if(order){
            let itemIndex = order.items.findIndex((i) => i.productId.equals(productId));
            if(itemIndex > -1){
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
const incrementProductUnit = async(req, res) => {
    const {userId} = req.params;
    const {productId} = req.body;

    try{
        let order = await Order.findOne({$and:[{userId}, {state:'active'}]});
        
        if(!order) return res.status(404).json({message:'Order not found'})
        
        let itemFound = await Product.findOne({_id: productId})

        if(!itemFound) return res.status(404).json({
            message: 'Product not found'
        })

        const price = itemFound.price;
        const stock = itemFound.stock;

        let itemIndex = order.items.findIndex((i) => i.productId.equals(productId));

        if(itemIndex === -1) return res.status(400).json({message:'Item not found'})
        

        if(itemIndex.quantity < stock) {
            let productItem = order.items[itemIndex]
            productItem.quantity += 1;
            order.items[itemIndex] = productItem
            order.totalAmount += price;
            
            order = await order.save();
            return res.status(201).json({order})

        } else {
            return res.status(400).json({message:'Cannot add more than the stock available'})
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({message:'There was an error'})
    }
}
//==========================================================================//
const decrementProductUnit = async(req, res) => {
    const {userId} = req.params;
    const {productId} = req.body;

    try{
        let order = await Order.findOne({$and:[{userId}, {state:'active'}]});
        
        if(!order) return res.status(404).json({message:'Order not found'})
        
        let itemFound = await Product.findOne({_id: productId})

        if(!itemFound) return res.status(404).json({
            message: 'Product not found'
        })

        const price = itemFound.price;
        

        let itemIndex = order.items.findIndex((i) => i.productId.equals(productId));

        if(itemIndex === -1) return res.status(400).json({message:'Item not found'})
        

        if(itemIndex.quantity > 0 ) {
            let productItem = order.items[itemIndex]
            productItem.quantity -= 1;
            order.items[itemIndex] = productItem
            order.totalAmount -= price;
            
            order = await order.save();
            return res.status(201).json({order})

        } else {
            return res.status(400).json({message:'Cannot decrement into negative numbers'})
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({message:'There was an error'})
    }
}

//==========================================================================//
const stateChange = async(req, res) => {
    const {userId} = req.params;
    const { state } = req.body;

    if(!req.body?.state) {
        return res.status(400).json({message: 'New State not found'});
    }
    
    const statesArray = ['active','completed', 'cancelled']
    if(!statesArray.includes(state)) return res.status(400).json({message:'State not valid'})

    try{
        let order = await Order.findOne({userId});

        if(order){
            order.state = state; 
            order = await order.save()
            res.status(200).json({message:'Order updated'})           
        } else {
            res.status(400).json({message:'Order not found'})
        }    
    } catch(error){
        console.log(error)
        res.status(500).json({message:'There was and error'})
    }    
}
//==========================================================================//
const getAllOrders = async(req,res)=>{
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;
    
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .populate("userId")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return res.json({ orders, current: page, pages: Math.ceil(count / pageSize) });
}

//==========================================================================//
const getOrdersByUser = async(req,res)=>{
    const {userId} = req.params;
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;
    
    const count = await Order.countDocuments();
    let orders = await Order.find({userId})
    .populate("userId")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    return res.json({ orders, current: page, pages: Math.ceil(count / pageSize) });
        
}
//==========================================================================//
const removeProductFromOrder = async(req,res)=>{
    const {userId} = req.params;
    const {productId} = req.body;
    try{
        let order = await Order.findOne({$and:[{userId}, {state:'active'}]});
        let itemIndex = order.items.findIndex((i) => i.productId.equals(productId));
    } catch (error){
        console.log(error);
        return res.status(500).json({message:'There was an error'})
    }
}
//==========================================================================//

module.exports = {
    addItem,
    stateChange,
    getAllOrders,
    getOrdersByUser,
    getActiveOrderFromUser,
    removeProductFromOrder,
    incrementProductUnit,
    decrementProductUnit
}
