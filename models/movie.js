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
    "IMDB Votes": Number
    })

movieSchema.pre("save", function(next){
    this["Major Genre"] = this["Major Genre"].toLowerCase()
    this.Title_lower = this.Title.toLowerCase()
    this.Director_lower = this.Title.toLowerCase()
    next()
});

movieSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "movie",
    localField: "_id"
}) //virtual populate: query database for all reviews



const movie = mongoose.model("movie", movieSchema);
module.exports = movie;
