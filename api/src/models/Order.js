const mongoose = require('mongoose');
const { Schema } = mongoose;
const Float = require("mongoose-float").loadType(mongoose, 2);

const orderSchema = new Schema({
  userId: {type: String, ref: 'User'},
  items: [{ 
    productId: {type:Schema.Types.ObjectId, ref:'Product'},
    name:{ type: String },
    quantity: { type:Number, required: true, min:[1], default: 1 },
    price: Float
  }],
  state:{ type: String, default: 'processing' },
  totalAmount:{ type: Float }     

})


module.exports = mongoose.model('Order', orderSchema);
