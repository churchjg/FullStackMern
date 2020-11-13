const Movie = require("../models/movie");
const catchAsync = require("./catchAsync")

module.exports = catchAsync(async (req, res) => {
    const filters = {}
    if (req.query.rating) filters["MPAA Rating"] = req.query.rating.toUpperCase()
    if (req.query.genre) filters["Major Genre"] = req.query.genre
    if (req.query.director) filters["Director"] = req.query.director.split(" ").join("+")
    if (req.query.title) filters["Title"] = req.query.title.split(" ").join("+")
    const doc = await Movie.find(filters)
    res.json({
        status:"success",
        data: doc
    });
})
