const movie = require("../models/movie");
const catchAsync = require("./catchAsync.js")

exports.getAll = catchAsync(  async (req, res) => {
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


exports.getOne = catchAsync(  async (req, res) => {
        const doc = await movie.findOne({slug: req.params.slug})
        res.json({
            status:"success",
            data: doc
        });
})

exports.updateOne = catchAsync(  async (req, res) => {
        const doc = await movie.findOneAndUpdate({slug: req.params.slug}, req.body, {
            runValidators: true,
            new: true
        })
        res.json({
            status:"success",
            data: doc
        });
})

exports.deleteOne = catchAsync(  async (req, res) => {
        const doc = await movie.findOneAndDelete({slug: req.params.slug})
        res.json({
            status:"success",
            data: doc
        });
})
