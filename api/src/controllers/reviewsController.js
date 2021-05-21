const mongoose = require("mongoose");
const Review = require("../models/Review");

const getReviews = (req, res) => {
    Review.find().select('username rating review _id').populate('product', 'name', 'prouctReview').exec()
        .then(docs=> {
            res.status(200).json({
                count: docs.length,
                reviews: docs.map(doc => {
                    return { _id: doc._id, usernme: doc.username, review: doc.review, rating:doc.rating }
                })
            })
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
};

const addReviews = async (req, res) => {
    try {
        const{ productReview, username, review, rating } = req.body;
        const reviews = Review({
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

module.exports = { getReviews, addReviews }