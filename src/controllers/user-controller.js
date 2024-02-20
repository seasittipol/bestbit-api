const fs = require('fs/promises')
const prisma = require("../model/prisma");
const cloudinary = require('../config/cloudinary');
const catchError = require("../utils/catch-error");

// exports.create = (req, res, next) => {
//     res.status(200).json(req.body)
// }

exports.updateUserById = catchError(async (req, res, next) => {
    console.log(req.files);
    console.log(req.body);

    const data = {}
    if (req.files) {
        console.log('upload1');
        const { secure_url } = await cloudinary.uploader.upload(req.files.profileImage[0].path, { use_filename: true })
        data.profileImage = secure_url
        fs.unlink(req.files.profileImage[0].path)

        await prisma.user.update({ where: { id: +req.user.id }, data })
        console.log('succsess');
        res.status(200).json(data)
    } else {
        await prisma.user.findFirst({ where: { id: +req.user.id } })
        const response = await prisma.user.update({
            where: { id: +req.user.id },
            data: req.body
        })
        delete response.password
        delete response.confirmPassword
        res.status(200).json(response)
    }
})
