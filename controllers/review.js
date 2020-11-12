const movie = require("../models/movie");
const catchAsync = ("./catchAsync.js")

// reviewRouter.route("/")
// .post(reviewCtrl.create)
// .get(reviewCtrl.getReviews)

// reviewRouter.route("/:id")
// .patch(reviewCtrl.update)
// .delete(reviewCtrl.delete)

exports.create = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})

exports.getReviews = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})


exports.update = catchAsync(  async (req, res) => {
    const doc = await movie.find()
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
