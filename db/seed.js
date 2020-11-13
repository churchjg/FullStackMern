const dotenv = require("dotenv").config({
  path: "./config.env"
})
const Movie = require("../models/movie")
const mongoose = require("./connection")
const fs = require("fs")

const jsonData = fs.readFileSync(__dirname + "/data.json", "utf-8")
const data = Array.from(JSON.parse(jsonData))
const seedData = async () => {
  try {
    await Movie.deleteMany()
    await Movie.insertMany(data)
    console.log(data.length);
    console.log("finish")
    process.exit()
  }
catch (err) {
  console.log(err);
  process.exit()
}
}
seedData();
