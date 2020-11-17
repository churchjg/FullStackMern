const Review = require("../models/reviews");
const catchAsync = require("./catchAsync.js")
const Movie = require("../models/movie")

// reviewRouter.route("/")
// .post(reviewCtrl.create)
// .get(reviewCtrl.getReviews)

// reviewRouter.route("/:id")
// .patch(reviewCtrl.update)
// .delete(reviewCtrl.delete)

exports.getReviews = catchAsync(  async (req, res) => {
    const docs = await Review.find()
    res.json({
        status:"success",
        results: docs.length,
        data: docs
    });
})

exports.create = catchAsync(  async (req, res) => {
    console.log(req.body)
    if (!req.body.rating) return res.status(400).json({message:"please include a rating"})
    const reviewData = Object.assign({}, req.body)
    reviewData.createdBy = req.user.id;
    const doc = await Review.create(reviewData)
    const movie = await Movie.findById(reviewData.movie)
    if (!movie.reviews) movie.reviews = []
    movie.reviews.push(doc._id)
    await movie.save()
    res.json({
        status:"success",
        data: doc
    });
})
exports.update = catchAsync(  async (req, res) => {
    const doc = await Review.findOneAndUpdate({_id: req.params.id, createdBy: req.user.id}, req.body, {
        runValidators: true,
        new: true
    })

    res.json({
        status:"success",
        data: doc
    });
})

exports.delete = catchAsync(  async (req, res) => {
    await Review.findOneAndDelete({_id: req.params.id, createdBy: req.user.id})
    res.json({
        status:"success",
        data: null
    });
})
