const server = require("express").Router();
const { getReviews, addReviews, getReviewsById } = require("../controllers/reviewsController");

server.get("/", getReviews);
server.post("/", addReviews);
server.get("/:id", getReviewsById)

module.exports = server;