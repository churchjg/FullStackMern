const catchAsync = require("./catchAsync");
const Movie = require("../models/movie")
const fs = require("fs")
const {promisify} = require("util");
const { fail } = require("assert");

const getJSON = async () => {
    const jsonData = await promisify(fs.readFile)(__dirname + "/data.json")
    return Array.from(JSON.parse(jsonData))
}

  module.exports = catchAsync(async (req, res) => {
    if (req.body.password != process.env.SEED_PASSWORD) return res.json({
        status: "fail",
        message: "you do not have permission to seed the database" //seeding from postman
    })
    await Movie.deleteMany();
    const data = await getJSON();
    const docs = await Movie.insertMany(data);
    res.json({
        status: "success",
        filesAdded: docs.length
    })

  })
