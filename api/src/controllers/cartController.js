const { ObjectId } = require('bson');
const Cart = require('./../models/Cart');
const Product = require ('./../models/Product')

//==========================================================================//
const getActiveCartFromUser = async(req, res)=> {
    console.log("entra al")
    const {userId} = req.params;
    let cart = await Cart.findOne({$and:[{userId}, {state:'active'}]});

    if(!cart){
        const newCart = await Cart.create({
            userId,
            items:[],
            totalAmount: 0
        });
        return res.status(201).json({newCart})
    }
    return res.status(200).json({cart})
}
//==========================================================================//
const addItem = async(req, res) => {
    const {userId} = req.params;
    const { productId, quantity } = req.body;

    try{
        let cart = await Cart.findOne({$and:[{userId}, {state:'active'}]});

        let newItem = await Product.findOne({_id: productId})
        
        if(!newItem) return res.status(404).json({message:'Product not found'})
        
        const price = newItem.price;
        const name = newItem.name;

        if(cart){
            let itemIndex = -1
            //let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));

            for(let i = 0; i<cart.items.length; i++){
                if(cart.items[i].productId.equals(productId)){
                    itemIndex = i;
                    break;
                }
            }

            if(itemIndex > -1){
                let productItem = cart.items[itemIndex]
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            }
            else {
                console.log("Not found")
                cart.items.push({productId, name, quantity, price})
            }

            cart.totalAmount += quantity*price;
            cart = await cart.save()
            return res.status(201).json({cart})
        
        }
        else {
            const newCart = await Cart.create({
                userId,
                items: [{productId, name, quantity, price}],
                totalAmount: quantity*price
            });
            return res.status(201).json({newCart})
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
        let cart = await Cart.findOne({$and:[{userId}, {state:'active'}]});
        
        if(!cart) return res.status(404).json({message:'Cart not found'})
        
        let itemFound = await Product.findOne({_id: productId})

        if(!itemFound) return res.status(404).json({
            message: 'Product not found'
        })

        const price = itemFound.price;
        const stock = itemFound.stock;

        let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));

        if(itemIndex === -1) return res.status(400).json({message:'Item not found'})
        

        if(itemIndex.quantity < stock) {
            let productItem = cart.items[itemIndex]
            productItem.quantity += 1;
            cart.items[itemIndex] = productItem
            cart.totalAmount += price;
            
            cart = await cart.save();
            return res.status(201).json({cart})

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
        let cart = await Cart.findOne({$and:[{userId}, {state:'active'}]});
        
        if(!cart) return res.status(404).json({message:'Cart not found'})
        
        let itemFound = await Product.findOne({_id: productId})

        if(!itemFound) return res.status(404).json({
            message: 'Product not found'
        })

        const price = itemFound.price;
        

        let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));

        if(itemIndex === -1) return res.status(400).json({message:'Item not found'})
        

        if(itemIndex.quantity > 0 ) {
            let productItem = cart.items[itemIndex]
            productItem.quantity -= 1;
            cart.items[itemIndex] = productItem
            cart.totalAmount -= price;
            
            cart = await cart.save();
            return res.status(201).json({cart})

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
    const { state } = req.query.state;

    //console.log("El user id es: "+userId+" y el state es: "+state)
    //return res.json({user:userId,state})
    //return res.json({stado:req.query.state})
    //if(!req.query?.state) {
    //    return res.status(400).json({message: 'New State not found'});
    //}
    //res.json({state:req.query.state})
    const statesArray = ['active','completed', 'cancelled']
    if(!statesArray.includes(req.query.state)) return res.status(400).json({message:'State not valid'})

    try{
        //let cart = await Cart.findOne({userId});
        let cart = await Cart.findOne({$and:[{userId}, {state:'active'}]})
        if(cart){
            //res.status(200).json({message:'entre aqui'})
            cart.state = req.query.state; 
            cart = await cart.save()
            
            res.status(200).json({message:'Cart updated'})           
        } else {
            res.status(400).json({message:'Cart not found'})
        }    
    } catch(error){
        console.log(error)
        res.status(500).json({message:'There was and error'})
    }    
}
//==========================================================================//
const getAllCarts = async(req,res)=>{
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;
    
    const count = await Cart.countDocuments({});
    const carts = await Cart.find({})
      .populate("userId")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return res.json({ carts, current: page, pages: Math.ceil(count / pageSize) });
}

//==========================================================================//
const getCartsByUser = async(req,res)=>{
    const {userId} = req.params;
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;
    
    const count = await Cart.countDocuments();
    let carts = await Cart.find({userId})
    .populate("userId")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    return res.json({ carts, current: page, pages: Math.ceil(count / pageSize) });
        
}
//==========================================================================//
const removeProductFromCart = async(req,res)=>{
    const {userId} = req.params;
    const { productId } = req.params;
    console.log("ENTRA",userId,productId)
    let cartFiltered = [];
    try{
        let cart = await Cart.findOne({$and:[{userId}, {state:'active'}]});
        let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));

        cart.items.map((prop,i) => {
            if(prop.productId != productId){
                cartFiltered.push(cart.items[i])
            }
        })
        cart.items = cartFiltered;
        const updateCart = await cart.save();
        res.status(200).json({cart:updateCart})
    } catch (error){
        console.log(error);
        return res.status(500).json({message:'There was an error'})
    }
}
//==========================================================================//

module.exports = {
    addItem,
    stateChange,
    getAllCarts,
    getCartsByUser,
    getActiveCartFromUser,
    removeProductFromCart,
    incrementProductUnit,
    decrementProductUnit
}