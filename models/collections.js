const mongoose = require("mongoose");
const slugify = require("slugify");

const collectionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must provide name"],
        unique: true,
        trim: true,
        maxlength: [100, "cannot be more than 100 characters"]
    },
    dateCreatedOn: {
        type: Date,
        default: Date.now()
    },
    description: String,
    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: "movie"
    }],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "must have a creator"]
    },
    slug: {
        type: String,
        unique: true
    }
});

collectionsSchema.pre(/^find/, function(next){ //match any "find" query thru mongoose
    this.populate("movies").populate("createdBy") //populate all movies from mongoDB and User
    next()
})

collectionsSchema.pre("save", function(next){
    this.slug = slugify(this.name, {
        lower: true,
    })
    next()
})
const collections = mongoose.model("collections", collectionsSchema)
module.exports = collections;
