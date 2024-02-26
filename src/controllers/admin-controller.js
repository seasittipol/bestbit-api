const prisma = require('../model/prisma')
const catchError = require('../utils/catch-error')

exports.getCoin = async (req, res, next) => {
    const response = await prisma.coin.findMany()
    res.status(200).json(response)
}

// add validate
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
    console.log(req.body);
    const response = await prisma.coin.findFirst({ where: req.body })
    if (!response) {
        return res.status(401).json('invalid coin name')
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
        data: { amountBaht: +req.body.amountBaht }
    })
    res.status(200).json(response2)
})