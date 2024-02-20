const prisma = require('../model/prisma')

exports.getAllCoin = async (req, res, next) => {
    const response = await prisma.coin.findMany({ select: { id: true, symbol: true, name: true } })

    res.status(200).json(response)
}