module.exports = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ message: err.message })
}