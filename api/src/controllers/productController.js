const Product = require("./../models/Product");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

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
    if(req.query.keyword){
      res.json({ products, current: page, pages: Math.ceil(count / pageSize),keyword:true });
    }
    else{
      res.json({ products, current: page, pages: Math.ceil(count / pageSize),keyword:false });
    }
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
const getProductsFilter = (req, res,next) => {
  if(req.query.minPrice || req.query.maxPrice){
    return next();
  }
  const filterName = req.params.filterName
  let filter = req.query.brand || req.query.size || req.query.color || req.query.genre;

  const keyword = filter
    ? {
        [filterName]: {
          $regex: filter,
          $options: "i",
        },
      }
    : {};
  Product.find({ ...keyword }).exec()
      .then(answer => {
        // if(answer.length === 0){
        //   return res.sendStatus(404);
        // }
        res.status(200).json({products:answer});
      })
      .catch(err => {
        res.status(404).json( {messege: "Product doesn't exist", err: err} );
      })
}

//filtrado por categoria
const getProductsFilterByCategory = (req, res) => {
  const name = req.params.name;

  Product.find({})
  .populate("categories")
      .then(answer => {
        let productsCategories = [];
        if(answer && answer.length > 0){
          for(let i = 0; i<answer.length; i++){
              if(answer[i].categories.find(cat => cat.name === name)){
                productsCategories.push(answer[i]);
              }
          }
        }
        res.status(200).json({products:productsCategories});
      })
      .catch(err => {
        res.status(404).json( {messege: "Product doesn't exist", err: err} );
      })
}


const getProductsFilterByPrice = (req, res,next) => {
  var minPrice = req.query.minPrice;
  var maxPrice = req.query.maxPrice;

  if(maxPrice && minPrice)
  var keyword = {
    price: {
      $gte: minPrice,
      $lte: maxPrice,
    }
  }

  if(minPrice && !maxPrice){
    //me trae los precios mayores al pasado por query
    var keyword = {
      price: {
        $gte: minPrice,
      }
    };
  }
  if(maxPrice && !minPrice){
    //me trae los precios menores al pasado por query
    var keyword = {
      price: {
        $lte: maxPrice,
      }
    }
  }
  Product.find({ ...keyword }).exec()
      .then(answer => {
        res.status(200).json({products:answer});
      })
      .catch(err => {
        res.status(404).json( {messege: "Product doesn't exist", err: err} );
      })
}



// @desc    Create a product
// @route   POST localhost:3001/products
// @access  Private/Admin

const addProducts = async (req, res) => {
  try {
    const { name, price, brand, description, stock, size, color, categories,genre } =
      req.body;
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
      categories: categories,
    });

    if (req.file) {
      const { filename } = req.file;
      product.setImgUrl(filename, name);
    }

    const productStored = await product.save();

    res.status(201).send({ productStored });
  } catch (e) {
    res.status(500).send({ message: e.errors });
  }
};

const imagaUpaload = (req, res) => {
  let getImage;
  const { name } = req.params;
  let pathImage = path.join(__dirname, "../");
  try {
    getImage = fs.readFileSync(`${pathImage}uploads\\${name}`);
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads\\noImage.png`);
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
    category,
    description,
    price,
    genre,
    stock,
    rating,
    size,
    color,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.brand = brand),
      (product.category = category),
      (product.description = description),
      (product.price = price),
      (product.stock = stock),
      (product.rating = rating),
      (product.size = size),
      (product.genre = genre),
      (product.color = color);

      if (req.file) {
        const { filename } = req.file;
        console.log("archivo img",filename)
        product.setImgUrl(filename, name);
      }
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
  getProductsFilterByPrice,
  getProductsFilterByCategory,
  addProducts,
  updateProducts,
  deleteProducts,
  getProductsById,
  imagaUpaload,
};
