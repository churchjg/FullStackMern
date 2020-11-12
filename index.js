const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(parser.json());

const authCtrl = require("");
const collectionCtrl = require("");
const reviewCtrl = require("");

const search = require("./controllers/movies");

const authRouter = express.Router();
const collectionRouter = express.Router();
const reviewRouter = express.Router();

authRouter.route("/")
.post(authCtrl.signup)
.get(authCtrl.getAll)

authRouter.post("/login", authCtrl.login)
authRouter.get("/logout", authCtrl.logout)
authRouter.delete("/delete-current", authCtrl.deleteCurrent)
authRouter.get("/current-user", authCtrl.getCurrent)

collectionRouter.route("/")
.get(collectionCtrl.getAll)
.post(collectionCtrl.create)

collectionRouter.route("/:slug")
.get(collectionCtrl.getOne)
.patch(collectionCtrl.updateOne)
.delete(collectionCtrl.deleteOne)

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





module.exports = app;
