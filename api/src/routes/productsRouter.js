const server = require("express").Router();
const upload = require('./../libs/storage');
const { isAuthenticated, isAdmin } = require('./../middlewares/customMiddlewares');

const {
  addProducts,
  getProductsFilter,
  getProductsFilterByCategory,
  getProducts,
  updateProducts,
  deleteProducts,
  getProductsById,
  imagaUpaload
} = require("../controllers/productController");


server.get("/", getProducts);
server.get("/:filterName", getProductsFilter)
server.get("/category/:name", getProductsFilterByCategory)
server.get("/:id", getProductsById)
server.get("/detail/:id", getProductsById)
server.post("/",upload.single("img"), addProducts);
server.put("/:id",upload.single("img"),updateProducts);
server.delete("/:id",deleteProducts);
server.get('/image/:name', imagaUpaload)

module.exports = server;
