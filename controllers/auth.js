const movie = require("../models/movie");
const catchAsync = ("./catchAsync.js")

exports.signup = catchAsync(  async (req, res) => {
    console.log(req.body);
    // const doc = await .find()
    res.json({
        status:"success",
        // data: doc
    });
})

exports.getAll = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})

exports.login = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})

exports.logout = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})

exports.deleteCurrent = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})

exports.getCurrent = catchAsync(  async (req, res) => {
    const doc = await movie.find()
    res.json({
        status:"success",
        data: doc
    });
})


// authRouter.route("/")
// .post(authCtrl.signup)
// .get(authCtrl.getAll)

// authRouter.post("/login", authCtrl.login)
// authRouter.get("/logout", authCtrl.logout)
// authRouter.delete("/delete-current", authCtrl.deleteCurrent)
// authRouter.get("/current-user", authCtrl.getCurrent)
