const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: { type: Schema.Types.ObjectId, ref: "User" },
  review: { type: String, required: "Review is required" },
  rating: { type: Number, required: "Rating is required" },
});

module.exports = mongoose.model("Review", reviewSchema);
