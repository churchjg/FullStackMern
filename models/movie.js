//const data = require('./moviedata.json')
const mongoose = require("../db/connection");
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    Title: String,
    Title_lower: String,
    "Release Date": String,
    "MPAA Rating": String,
    "Major Genre": String,
    "Creative Type": String,
    "Director": String,
    Director_lower: String,
    "Rotten Tomatoes Rating": Number,
    "IMDB Rating": Number,
    "IMDB Votes": Number,
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: "Review"
    }]
    },{
      toJSON: {virtuals: true},
      toObject: {virtuals: true}
    })


//pre middleware before any search
movieSchema.pre(/^find/, function(next){ //match any "find" query thru mongoose
    this.populate("reviews") //populate all reviews from mongoDB and User
    next()
})

// movieSchema.virtual("reviews", {
//     ref: "Review",
//     foreignField: "movie",
//     localField: "_id"
//}) //virtual populate: query database for all reviews



const movie = mongoose.model("movie", movieSchema);
module.exports = movie;
