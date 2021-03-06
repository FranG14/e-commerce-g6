const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const productSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: "Name is required",
    },
    img: [
      {
        type: String,
        // require: "Image is required",
      }
    ],
    brand: {
      type: String,
      required: "Brand is required",
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    description: {
      type: String,
      required: "Description is required",
    },
    genre: {
      type: String,
      required: "Genre is required"
    },
    price: {
      type: Number,
      // required: "Price is required",
      validate: {
        validator: function (v) {
          return /^[+-]?\d+(\.\d+)?$/.test(v);
        },
        message: props => `${props.value} is not a valid number!`
      },
      required: [true, 'Insert a number required']
    },
    stock: {
      type: Number,
      required: "Stock is required",
      validate: {
        validator: function (v) {
          return /^[+-]?\d+(\.\d+)?$/.test(v);
        },
        message: props => `${props.value} is not a valid number!`
      },
      required: [true, 'Insert a number required']
    },
    productReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
    size: [
      {
        type: String,
        //required: "Size is required",
      }
    ],
    color: [
      {
        type: String,
        required: "Color is required",
      }
    ],
  },
  {
    timestamps: true,
  }
);


productSchema.methods.setImgUrl = function setImgUrl(filename, name) {
  this.img = filename
}

module.exports = mongoose.model("Product", productSchema);
