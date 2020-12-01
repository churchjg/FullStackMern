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
const seed = require("./controllers/seed");

const authRouter = express.Router();
const collectionRouter = express.Router();
const reviewRouter = express.Router();

//Authorization
authRouter.route("/")
    .post(authCtrl.signup) //auth/signup
//.get(authCtrl.getAll)

authRouter.post("/login", authCtrl.login) // /auth/login
authRouter.use(authCtrl.protect) //middleware
authRouter.get("/logout", authCtrl.logout)
authRouter.get("/current-user", authCtrl.getCurrent)

//Collections
collectionRouter.route("/")
    .get(collectionCtrl.getAll) // /api/collections
//.post(authCtrl.protect, collectionCtrl.create)

collectionRouter.route("/:slug")
    .get(collectionCtrl.getOne) // /api/collections/:slug (slug is referencing name of collection created by user)
    .patch(authCtrl.protect, collectionCtrl.updateOne) // /:slug
    .delete(authCtrl.protect, collectionCtrl.deleteOne)

//Reviews
reviewRouter.route("/")
    .post(authCtrl.protect, reviewCtrl.create) // /api/reviews
    .get(reviewCtrl.getReviews) // /api/reviews

reviewRouter.route("/:id")
    .patch(authCtrl.protect, reviewCtrl.update)
    .delete(authCtrl.protect, reviewCtrl.delete)

app.post("/api/seed", seed)

app.get("/api/movies", search) //titles

app.use("/auth", authRouter) // /auth/login

app.use("/api/collections", collectionRouter) // /api/collections/:slug

app.use("/api/reviews", reviewRouter)  // api/reviews (getAll) api/reviews/id (getOne, Update, Delete)


app.get("/", (req, res) => res.redirect("/api/collections"))

app.all("*", (req, res) => res.status(404).json({
    status: "fail",
    message: "this route is undefined"
}));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));




module.exports = app;
