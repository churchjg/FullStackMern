const Movie = require("../models/movie");
const catchAsync = require("./catchAsync")

//filter algorithm

module.exports = catchAsync(async (req, res) => {
    const filters = {}
    const firstLetter = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
    if (req.query.rating) filters["MPAA Rating"] = req.query.rating.toUpperCase()
    if (req.query.genre) filters["Major Genre"] = firstLetter(req.query.genre)
    if (req.query.director) filters["Director"] = {'$regex' : req.query.director, '$options' : 'i'}
    if (req.query.title) filters["Title"] = {'$regex' : req.query.title, '$options' : 'i'}

    const page = parseInt(req.query.page) || 1; //default page
    const limit = parseInt(req.query.limit) || 25; //default
    const skip = (page - 1)*limit; //limit is 25



    const doc = await Movie.find(filters).skip(skip).limit(limit) //increments based on limit

    res.json({
        status:"success",
        results: doc.length,
        page,
        data: doc
    });
})


//db.collection.find({name:{'$regex' : 'string', '$options' : 'i'}})
//regex:title contains search query
//option i: not case sensitive
