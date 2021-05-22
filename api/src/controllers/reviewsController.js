const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");

const getReviews = asyncHandler(async (req, res) => {
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;

    const count = await Review.countDocuments();
    const reviews = await Review.find().populate( "products")
        .limit(pageSize).skip(pageSize * (page - 1));
        res.json({ reviews, current: page, pages: Math.ceil(count / pageSize) });
        
});

const getReviewsById = (req, res) => {
    Review.find({ productReview:  req.params.id }).populate('user').then((review) => {
    if (!review) {
      return res.status(404).end();
    }
    return res.status(200).json(review);
  });
};

const addReviews = async (req, res) => {
    try {
        const{ productReview, username, review, rating } = req.body;
        const reviews = new Review({
            _id: new mongoose.Types.ObjectId(),
            productReview: productReview,
            username: username,
            review: review,
            rating: rating 
        });
        const answer = await reviews.save();
        res.status(200).send({answer})
    }
    catch(err) {
        res.status(400).send(err)
    }
}

module.exports = { getReviews, addReviews, getReviewsById }