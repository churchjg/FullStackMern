const express = require("express");
const app = express();
const actor = require("./models/actor")
const parser = require("body-parser");
const cors = require("cors");
const movie = require("./models/movie");

// const foodInfo = require('../models/foodinfo');
app.use(cors());
app.use(parser.json());

//redirects to homepage
app.get('/', (req, res)=>{
    res.redirect("/Home")
})

//homepage
app.get("/Home", (req, res) => {
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

app.put("/:id", (req, res) => {
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
    movie.findOneAndRemove(
        { _id: req.params.id }
    ).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.get("/:id", (req, res) => {
    actor.findById(req.params.id).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.get("/name/:name", (req, res) => {
    actor.find({ name: req.params.name }).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.post("/", (req, res) => {
    actor.create(req.body).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.put("/:id", (req, res) => {
    actor.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    ).then(data => {
        console.log(data);
        res.json(data);
    })

})

app.delete("/:id", (req, res) => {
    actor.findOneAndRemove(
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
