module.exports = fx => {
    return (req, res, next) => {
        fx(req, res, next).catch((err) => {
            console.log(err);
            res.status(200).json({
                status: "fail",
                message: "something went wrong",
                error: err
            })
        })
    }
}
