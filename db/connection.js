const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/moviesDB", { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;