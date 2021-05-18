const server = require("express").Router();
const { getReviews, addReviews } = require("../controllers/reviewsController");

server.get("/", getReviews);
server.post("/", addReviews);

module.exports = server;