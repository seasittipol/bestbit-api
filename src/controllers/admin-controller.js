const prisma = require('../model/prisma')

exports.getCoin = async (req, res, next) => {
    const response = await prisma.coin.findMany()
    res.status(200).json(response)
}

// create: body symbol, name, image
exports.createCoin = async (req, res, next) => {
    const response = await prisma.coin.create({
        data: req.body
    })
    res.status(200).json(response)
}

// update: body symbol*, name, image
exports.updateCoin = async (req, res, next) => {
    const symbol = req.body.symbol
    const { id } = await prisma.coin.findFirst({ where: { symbol } })
    const data = req.body
    const response = await prisma.coin.update({
        where: { id },
        data
    })
    res.status(200).json(response)
}

// delete: body symbol*
exports.deleteCoin = async (req, res, next) => {
    const symbol = req.body.symbol
    const { id } = await prisma.coin.findFirst({ where: { symbol } })
    const response = await prisma.coin.delete({ where: { id } })
    res.status(200).json('delete ', response.symbol)
}