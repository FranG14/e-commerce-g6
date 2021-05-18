// Read environment variables
require("dotenv").config();

const configurations = {   
    MONGODB_URI: `mongodb+srv://mongo:${process.env.PASSWORD}@cluster0.58swq.mongodb.net/ecommercedb?retryWrites=true&w=majority`
};


module.exports = configurations;