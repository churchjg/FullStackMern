const express = require("express");
const app = express();
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config({
    path: "./config.env"
})
const mongoose = require("./db/connection");

app.use(cors());
app.use(parser.json());
app.use(cookieParser());

const authCtrl = require("./controllers/auth");
const collectionCtrl = require("./controllers/collections");
const reviewCtrl = require("./controllers/review");
const search = require("./controllers/movie");

const authRouter = express.Router();
const collectionRouter = express.Router();
const reviewRouter = express.Router();

//Authorization
authRouter.route("/")
.post(authCtrl.signup)
//.get(authCtrl.getAll)

authRouter.post("/login", authCtrl.login)
authRouter.use(authCtrl.protect) //middleware
authRouter.get("/logout", authCtrl.logout)
authRouter.get("/current-user", authCtrl.getCurrent)

//Collections
collectionRouter.route("/")
.get(collectionCtrl.getAll)
.post(authCtrl.protect, collectionCtrl.create)

collectionRouter.route("/:slug")
.get(collectionCtrl.getOne)
.patch(authCtrl.protect, collectionCtrl.updateOne)
.delete(authCtrl.protect, collectionCtrl.deleteOne)

//Reviews
reviewRouter.route("/")
.post(reviewCtrl.create)
.get(reviewCtrl.getReviews)

reviewRouter.route("/:id")
.patch(reviewCtrl.update)
.delete(reviewCtrl.delete)


app.get("/api/movies", search)

app.use("/auth", authRouter)

app.use("/api/collections", collectionRouter)

app.use("/api/reviews", reviewRouter)


app.get("/", (req, res) => res.redirect("/api/collections"))

app.all("*", (req, res) => res.status(404).json({
    status: "fail",
    message: "this route is undefined"
}));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));




module.exports = app;
