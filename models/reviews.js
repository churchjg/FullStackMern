const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating has to be atleast 1"],
        max: [5, "max rating cannot be greater than 5"]
    },
    comment: String

})
