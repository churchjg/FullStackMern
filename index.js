const express = require("express");
const app = express();
const Schedule = require("./models/movie")
const parser = require("body-parser");
const cors = require("cors");
const movie = require("./models/movie");

// const foodInfo = require('../models/foodinfo');
app.use(cors());
app.use(parser.json());

app.get("/", (req, res) => {
    movie.find({}).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.get("/:id", (req, res) => {
    movie.findById(req.params.id).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.get("/name/:name", (req, res) => {
    movie.find({ name: req.params.name }).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.post("/", (req, res) => {
    movie.create(req.body).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.post("/:id", (req, res) => {
    movie.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    ).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.delete("/:id", (req, res) => {
    Country.findOneAndRemove(
        { _id: req.params.id }
    ).then(data => {
        console.log(data);
        res.json(data);
    })

})


app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
    console.log(`✅ PORT: ${app.get("port")} 🌟`);
});


//test !!!!!!
