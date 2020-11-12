//const data = require('./moviedata.json')
const mongoose = require("../db/connection");
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: String,
    image: String,
    genres: Array,
    keywords: String,
    Belongs_to_collection: Object,
    summary: String,
    actors: String,
    directors: String,
    release_date: String,
    rating: Number,
    country: String,
    trailer: String,
    })
    

const movie = mongoose.model("movie", movieSchema);
module.exports = movie; 