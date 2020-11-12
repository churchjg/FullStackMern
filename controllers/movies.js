const ArtistList = require("../models/movieInfo.js");
//create an movie list:
    //name
    //description



//create a list "array"

exports.getAll = async (req, res) => {
    try {
        const doc = await movies.find()
        res.json({
            status:"success",
            data: doc
        });
    }

    catch (err) {
        console.log (err);
        res.json({err})

    }

}


exports.create = async (req, res) => {
    console.log(req.body)
    if (!req.body.name) return res.status(400).json({message:"please include correct movie name"})
    try {
        const doc = await movie.create(req.body)
        res.json({
            status:"success",
            data: doc
        });
    }

    catch (err) {
        console.log (err);
        res.json({err})

    }

}


exports.update = async (req, res) => {
    try {
        const doc = await movie.findOneAndUpdate({slug: req.params.slug}, req.body, {
            runValidators: true,
            new: true
        })
        res.json({
            status:"success",
            data: doc
        });
    }

    catch (err) {
        console.log (err);
        res.json({err})

    }
}


exports.delete = async (req, res) => {
    try {
        const doc = await movie.findOneAndDelete({slug: req.params.slug})
        res.json({
            status:"success",
            data: doc
        });
    }

    catch (err) {
        console.log (err);
        res.json({err})

    }
}


exports.getOne = async (req, res) => {
    try {
        const doc = await movie.findOne({slug: req.params.slug})
        res.json({
            status:"success",
            data: doc
        });
    }

    catch (err) {
        console.log (err);
        res.json({err})

    }
}
