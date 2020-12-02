const User = require("../models/user");
const catchAsync = require("./catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { db } = require("../models/user");

exports.signup = catchAsync(async (req, res) => {
    console.log(req.body);
    const user = User.create(req.body)
    res.json({
        status: "success",
        data: user
    });
})

exports.getAll = catchAsync(async (req, res) => {
    console.log("getallusers");
    const users = await User.find()
    console.log("querycomp");
    res.json({
        status: "success",
        data: users
    });
})

//compare encrpyt password w/ user password
//once validated, issue web token
//token hits protect
//validates the token
//cookies stores the token, cookie everytime user makes a request for validation
exports.login = catchAsync(async (req, res) => {
    console.log("We're in login!")
    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password) return res.status(400).json({
        status: "fail",
        message: "need email and password"
    });
    const user = await User.findOne({ email: email }).select("+password")
    //const testing = User.findOne({ email: "testing@test.com" })
    console.log("user", user)

    if (!user) return res.status(400).json({
        status: "fail",
        message: "email not found"
    });
    const correctLogin = await user.comparePasswords(password, user.password)
    if (!correctLogin) return res.status(400).json({
        status: "fail",
        message: "need correct login"
    });
    /*const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY //key card, not password, token for login
    })*/
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY //key card, not password, token for login
    })
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 1000 * 60 * 60 * 24), //good for 90 days
        secure: req.secure || req.headers["x-forwarded-proto" === "https"],
        httpOnly: true
    }) //storing the token

    user.password = undefined //preventing password from exposed to clients

    res.json({
        status: "success",
        data: user,
        token
    });
})

//protect middleware: protects routers from unauth users (no response, filters out not logged in users)
exports.protect = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith("Bearer")) token = authHeader.split(" ")[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;
    if (!token) return res.status(400).json({
        status: "fail",
        message: "not logged in"
    });
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)
    if (!currentUser) return res.status(400).json({
        status: "fail",
        message: "not logged in"
    });
    req.user = currentUser; //req.user.id (validates the user, saves current users id)
    next()
})



exports.logout = catchAsync(async (req, res) => {
    res.cookie("jwt", "logged out", {
        expires: new Date(Date.now() + 10000), //set the token to expire in 10 secs, auto delete the cookie, have to sign in again
        httpOnly: true
    })
    res.json({
        status: "success"
    });
})

//current users info "My Account"
exports.getCurrent = catchAsync(async (req, res) => {

    res.json({
        status: "success",
        data: req.user
    });
})


// authRouter.route("/")
// .post(authCtrl.signup)
// .get(authCtrl.getAll)

// authRouter.post("/login", authCtrl.login)
// authRouter.get("/logout", authCtrl.logout)
// authRouter.delete("/delete-current", authCtrl.deleteCurrent)
// authRouter.get("/current-user", authCtrl.getCurrent)
