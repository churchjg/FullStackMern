// const movie = require("../models/movie");
const Collection = require("../models/collections");
const catchAsync = require("./catchAsync.js")


exports.getAll = catchAsync(async (req, res) => {
    const docs = await Collection.find()
    res.json({
        status: "success",
        results: docs.length,
        data: docs
    });
})


exports.create = catchAsync(async (req, res) => {
    console.log("we're in create", req.body)
    if (!req.body.name) return res.status(400).json({ message: "please include correct movie name" })
    const collectionData = Object.assign({}, req.body)
    collectionData.createdBy = req.user.id;
    const doc = await Collection.create(collectionData)
    res.json({
        status: "success",
        data: doc
    });
})


exports.getOne = catchAsync(async (req, res) => {
    const doc = await Collection.findOne({ slug: req.params.slug })
    res.json({
        status: "success",
        data: doc
    });
})

exports.updateOne = catchAsync(async (req, res) => {
    const doc = await Collection.findOneAndUpdate({ slug: req.params.slug, createdBy: req.user.id }, req.body, {
        runValidators: true,
        new: true
    })
    res.json({
        status: doc ? "success" : "fail",
        data: doc
    });
})

exports.deleteOne = catchAsync(async (req, res) => {
    const doc = await Collection.findOneAndDelete({ slug: req.params.slug, createdBy: req.user.id })
    res.json({
        status: doc ? "success" : "fail",
        data: doc
    });
})
