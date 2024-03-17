const fs = require('fs/promises')
const prisma = require("../model/prisma");
const cloudinary = require('../config/cloudinary');
const catchError = require('../utils/catch-error')
const createError = require('../utils/create-error')

exports.getCoin = async (req, res, next) => {
    const response = await prisma.coin.findMany()
    res.status(200).json(response)
}

// add validate
// create: body symbol, name, image
exports.createCoin = catchError(async (req, res, next) => {
    const response = await prisma.coin.create({
        data: req.body
    })
    res.status(200).json(response)
}
)
exports.createCoinIcon = catchError(async (req, res, next) => {
    // const data = {}
    if (req.files) {
        const { secure_url } = await cloudinary.uploader.upload(req.files.iconImage[0].path, { use_filename: true })
        // data.iconImage = secure_url
        fs.unlink(req.files.iconImage[0].path)

        // await prisma.coin.update({ where: { id: +req.user.id }, data })
        res.status(200).json({ url: secure_url })
    }
}
)
// update: body symbol*, name, image
exports.updateCoin = async (req, res, next) => {
    const symbol = req.body.symbol
    const response = await prisma.coin.findFirst({ where: { symbol } })
    if (!response) {
        createError('invalid coin name', 401)
    }
    const data = req.body
    const response2 = await prisma.coin.update({
        where: { id: response.id },
        data
    })
    res.status(200).json(response2)
}

// delete: body symbol*
exports.deleteCoin = async (req, res, next) => {
    console.log(req.body);
    const response = await prisma.coin.findFirst({ where: req.body })
    if (!response) {
        createError('invalid coin name', 401)
    }
    const response2 = await prisma.coin.delete({ where: { id: response.id } })
    res.status(200).json(response2)
}

exports.getTransaction = async (req, res, next) => {
    const response = await prisma.transaction.findMany({
        include: {
            user: {
                select: {
                    name: true
                }
            },
            coin: {
                select: {
                    symbol: true
                }
            }
        }
    })
    res.status(200).json(response)
}

exports.createWallet = catchError(async (req, res, next) => {
    const response = await prisma.wallet.create({ data: req.body })
    res.status(200).json(response)
})

exports.topupMoneyByUserId = catchError(async (req, res, next) => {
    console.log(req.body);
    const response = await prisma.wallet.findFirst({ where: { userId: req.body.id } })
    console.log(response);
    const response2 = await prisma.wallet.update({
        where: { id: response.id },
        data: { amountUsd: +req.body.amountUsd }
    })
    res.status(200).json(response2)
})

exports.getAllUser = catchError(async (rqe, res, next) => {
    const response = await prisma.user.findMany()
    const data = response.map(el => {
        delete el.password
        delete el.confirmPassword
        return el
    })
    res.status(200).json(data)
})

exports.updateUserById = catchError(async (req, res, next) => {
    const { id, name, email, mobile } = req.body
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        createError('invalid userId', 401)
    }
    const data = { id, name, email, mobile }
    const response = await prisma.user.update({
        where: { id: data.id },
        data
    })
    delete response.password
    res.status(200).json(response)
})

exports.delteUserById = catchError(async (req, res, next) => {
    const { userId } = req.params
    const user = await prisma.user.findUnique({ where: { id: +userId } })
    if (!user) {
        createError('invalid userId', 401)
    }
    const response = await prisma.user.delete({
        where: { id: +userId }
    })
    delete response.password
    console.log(response);
    res.status(200).json(response)
})