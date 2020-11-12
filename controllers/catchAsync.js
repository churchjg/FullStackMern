module.exports = fx => {
    return (req, res) => fx(req, res).catch(res.status(200).json({
        status: "fail",
        message: "something went wrong"
    }))
}
