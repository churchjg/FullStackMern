const mongoose = require("mongoose");
const Schema = mongoose.Schema

const reviewSchema = Schema({
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating has to be atleast 1"],
        max: [5, "max rating cannot be greater than 5"]
    },
    comment: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "must have a creator"]
    },
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: "movie",
        required: [true, "must have a creator"]
    },
    dateCreatedOn: {
        type: Date,
        default: Date.now()
    },
    lastEdited: {
        type: Date,
        default: Date.now()
    }
})

reviewSchema.pre("save", function(next){
    this.lastEdited = Date.now()
    next()
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review;
