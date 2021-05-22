const Product = require("./../models/Product");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const { where } = require("../models/Order");


// @desc    Fetch all products
// @route   GET localhost:3001/products
// @access  Public
const getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = req.query.pageSize || 15;
  const page = req.query.page || 1;
  console.log(page);
  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i", 
      },
    }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate("categories")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, current: page, pages: Math.ceil(count / pageSize) });
});

const getProductsById = (req, res) => {
  Product.findById(req.params.id).then((product) => {
    if (!product) {
      return res.status(404).end();
    }
    return res.status(200).json(product);
  });
};

//filtra por brand, size,color,genre
const getProductsFilter = (req, res, next) => {
  let filter = req.query.brand || req.query.size || req.query.genre || req.query.price;
  let keyword;
  let filterPrice
  if (filter == "price") {
    filterPrice = {
      field: req.query.price
    }
  }
  if (filter !== "") {
    keyword = {
      brand: {
        $regex: req.query.brand,
        $options: "i",
      }, size: {
        $regex: req.query.size,
        $options: "i",
      },
      genre: {
        $regex: req.query.genre,
        $options: "i",
      },
    }
  } else {

    keyword = {}
  }
  Product.find({...keyword}).sort({price:req.query.price})
    .populate("categories")
    .then(answer => {
      console.log("ANSWER", answer)
      if (req.query.category) {
        let productsCategories = [];
        if (answer && answer.length > 0) {
          for (let i = 0; i < answer.length; i++) {
            if (answer[i].categories.find(cat => cat.name === req.query.category)) {
              productsCategories.push(answer[i]);
            }
          }
        }


        return res.status(200).json({ products: productsCategories });
      }

      res.status(200).json({ products: answer });
    })
    .catch(err => {
      res.status(404).json({ messege: "Product doesn't exist", err: err });
    })

}


//filtrado por categoria
const getProductsFilterByCategory = (req, res) => {
  const name = req.params.name;

  Product.find({})
    .populate("categories")
    .then(answer => {
      let productsCategories = [];
      if (answer && answer.length > 0) {
        for (let i = 0; i < answer.length; i++) {
          if (answer[i].categories.find(cat => cat.name === name)) {
            productsCategories.push(answer[i]);
          }
        }
      }
      res.status(200).json({ products: productsCategories });
    })
    .catch(err => {
      res.status(404).json({ messege: "Product doesn't exist", err: err });
    })
}


/*  */


// @desc    Create a product
// @route   POST localhost:3001/products
// @access  Private/Admin

const addProducts = async (req, res) => {
  try {
    const { name, price, brand, description, stock, size, color, categories, genre } =
      req.body;
    let images = [];
    const categoriesArray = categories.split(",")
    if(req.files){
      for(let i = 0; i<req.files.length; i++ ){
        images.push(req.files[i].filename);
      }
    }
    const product = Product({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      price: price,
      brand: brand,
      description: description,
      stock: stock,
      genre: genre,
      size: size,
      color: color,
      categories: categoriesArray,
      img: images
    });

    const productStored = await product.save();

    res.status(201).send({ productStored });
  } catch (e) {
    res.status(500).send({ message: e.errors });
  }
};

const imagaUpaload = (req, res) => {
  let getImage;
  const { name } = req.params;
  const images = name.split(",")
  let pathImage = path.join(__dirname, "../");
  try {
    if(images.length>0){
      getImage = fs.readFileSync(`${pathImage}uploads\\${images[0]}`);
    }
    else{
      getImage = fs.readFileSync(`${pathImage}uploads\\${name}`);
    }
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads/noImage.png`);
  }
  res.set({ "Content-Type": "image/png" });
  res.send(getImage);
};

// @desc    Update a product
// @route   PUT localhost:3001/products/:id
// @access  Private/Admin
const updateProducts = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    categories,
    description,
    price,
    genre,
    stock,
    rating,
    size,
    color,
  } = req.body;
  const categoryArray = categories.split(",")
  let images = [];
  if(req.files){
    for(let i = 0; i<req.files.length; i++ ){
      images.push(req.files[i].filename);
    }
  }
  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.brand = brand),
      (product.categories = categoryArray),
      (product.description = description),
      (product.price = price),
      (product.stock = stock),
      (product.rating = rating),
      (product.size = size),
      (product.genre = genre),
      (product.img = images),
      (product.color = color);

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Porduct not found");
  }
});

// @desc    Delete a product by id
// @route   DELETE localhost:3001/products/:id
// @access  Private/Admin
const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ messege: "Product removed successfully" });
  } else {
    res.status(404);
    throw new Error("Porduct not found");
  }
});

module.exports = {
  getProducts,
  getProductsFilter,
  getProductsFilterByCategory,
  addProducts,
  updateProducts,
  deleteProducts,
  getProductsById,
  imagaUpaload,
};
