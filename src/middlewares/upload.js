const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(1);
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(2, file);
        const filename = '' + Date.now() + Math.round(Math.random() * 1000000) + '.' + file.mimetype.split('/')[1]
        cb(null, filename)
    }
})

module.exports = multer({ storage })