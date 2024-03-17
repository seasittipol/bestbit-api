module.exports = (req, res, next) => {
    console.log('page not found');
    res.status(404).json({ message: 'page not found' })
}
