const Review = require("../models/reviews");
const catchAsync = require("./catchAsync.js")

// reviewRouter.route("/")
// .post(reviewCtrl.create)
// .get(reviewCtrl.getReviews)

// reviewRouter.route("/:id")
// .patch(reviewCtrl.update)
// .delete(reviewCtrl.delete)

exports.getReviews = catchAsync(  async (req, res) => {
    const doc = await Review.find()
    res.json({
        status:"success",
        data: doc
    });
})

exports.create = catchAsync(  async (req, res) => {
    console.log(req.body)
    if (!req.body.rating) return res.status(400).json({message:"please include a rating"})
    const reviewData = Object.assign({}, req.body)
    reviewData.createdBy = req.user.id;
    const doc = await Review.create(reviewData)
    res.json({
        status:"success",
        data: doc
    });
})
exports.update = catchAsync(  async (req, res) => {
    const doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    })

    res.json({
        status:"success",
        data: doc
    });
})

exports.delete = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})
