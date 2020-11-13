const movie = require("../models/movie");
const catchAsync = require("./catchAsync.js")

// reviewRouter.route("/")
// .post(reviewCtrl.create)
// .get(reviewCtrl.getReviews)

// reviewRouter.route("/:id")
// .patch(reviewCtrl.update)
// .delete(reviewCtrl.delete)

exports.getReviews = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})

exports.create = catchAsync(  async (req, res) => {
    console.log(req.body)
    if (!req.body.name) return res.status(400).json({message:"please include correct movie name"})
    const doc = await movie.create(req.body)
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
