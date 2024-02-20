const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.upload = async path => {
    const { secure_url } = await cloudinary.uploader.upload(path, {
        use_filename: true
    })
    return secure_url
}