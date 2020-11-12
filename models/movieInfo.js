//const data = require('./moviedata.json')
const mongoose = require("../db/connection");
const Schema = mongoose.Schema;


// Starter Schema 1
const movieInfoSchema = new Schema({
title: String,
image: String,
genres: Array,
keywords: String,
Belongs_to_collection: null,
summary: String,
actors: String,
directors: String,
releaseDate: String,
rating: Number,
country: String,
trailer: String
})

const movie = mongoose.model("movie", movieSchema);
module.exports = movie;


