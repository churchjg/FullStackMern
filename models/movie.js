//const data = require('./moviedata.json')
const mongoose = require("../db/connection");
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: String,
    image: String,
    categories: String,
    tags: String,
    summary: String,
    actors: String,
    directors: String,
    releaseDate: String,
    Rating: String,
    country: String,
    trailer: String
})

const movie = mongoose.model("movie", movieSchema);
module.exports = movie; 