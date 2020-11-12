const mongoose = require("../db/connection");
const Schema = mongoose.Schema;


const actorSchema = new Schema({
    name: String,
    image: String,
    biography: String,
    popularity: Number,
    movies: String,
    birthday: String,
    deathday: String,
    minority: Boolean,
    gender: {
        type: Integer,
        minlength: 0,
        maxlength: 2,
        default: 0,
    },
    socialMedia: String,

})


const actor = mongoose.model("actor", actorSchema);
module.exports = actor; 