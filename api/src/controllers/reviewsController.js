const mongoose = require("mongoose");
const Review = require("../models/Review");
const Product = require("../models/Product");

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

const addReviews = (req, res) => {
    Product.findById(req.body.produtId)
    .then(product => {
        if(!product) {
            console.log('ESTOY ACA!!!', product);
            return res.status(404).json({message: "Product not found"})
        }
        const reviews = new Review({
            id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            review: req.body.review,
            rating: req.body.rating 
        });
        return reviews.save();
    })
    .then(answer => {
        console.log('¡ACÁ ESTOY!', answer);
        res.status(200).json({
            message: 'Review crated!',
            cratedReview: {
                _id: answer.id,
                username: answer.username,
                review: answer.review,
                rating: answer.rating
            }
        })
        .catch(err => {
            console.log('SOY UN ERROR: ', err);
            res.status(500).json({message: 'An error has ocurred', err: err})
        })
    })
};

module.exports = { getReviews, addReviews }