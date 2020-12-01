const mongoose = require("mongoose");

/*const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD).replace("<dbname>", process.env.DB_NAME);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>console.log("db connection success")).catch(err=>console.log(err));*/

let mongoURI = "";
if (process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL;
} else {
    mongoURI = "mongodb://localhost/recipe";
}
mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
});

module.exports = mongoose;
