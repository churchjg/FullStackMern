const User = require("../models/user");
const catchAsync = require("./catchAsync")

exports.signup = catchAsync(  async (req, res) => {
    console.log(req.body);
    const user = User.create(req.body)
    res.json({
        status:"success",
        data: user
    });
})

exports.getAll = catchAsync(  async (req, res) => {
    console.log("getallusers");
    const users = await User.find()
    console.log("querycomp");
    res.json({
        status:"success",
        data: users
    });
})

exports.login = catchAsync(  async (req, res) => {
    const doc = await User.find()
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
