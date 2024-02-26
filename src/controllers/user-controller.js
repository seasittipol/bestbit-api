const fs = require('fs/promises')
const prisma = require("../model/prisma");
const cloudinary = require('../config/cloudinary');
const catchError = require("../utils/catch-error");
const createError = require('../utils/create-error');

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

exports.depositById = catchError(async (req, res, next) => {
    console.log(123, req.files);
    console.log(123123, req.body['amount'])
    console.log(123123123, req.user.id);
    const data = { userId: +req.user.id }
    if (req.files && +req.body['amount'] > 999) {
        console.log('upload1');
        const { secure_url } = await cloudinary.uploader.upload(req.files.depositImage[0].path, { use_filename: true })
        data.image = secure_url
        fs.unlink(req.files.depositImage[0].path)

        data.amount = +req.body.amount

        const response = await prisma.deposit.create({ data })
        console.log('succsess');
        return res.status(200).json(response)
    }
    res.status(401).json({ message: 'check image or input amount' })
})

exports.getTransaction = catchError(async (req, res, next) => {
    const response = await prisma.transaction.findMany({
        where: { userId: req.user.id },
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
})
// add being transaction
exports.spotTrade = catchError(async (req, res, next) => {
    const walletUser = await prisma.wallet.findFirst({ where: { userId: req.user.id } })
    const coin = await prisma.coin.findFirst({ where: { symbol: req.body.symbol } })
    const currentMoney = walletUser.amountBaht
    if (currentMoney > req.body.total && req.body.status === 'BUY') {
        const remainMoney = currentMoney - req.body.total
        await prisma.wallet.update({
            where: { id: walletUser.id },
            data: { amountBaht: remainMoney }
        })
        const data = {}
        data.amount = req.body.amount
        data.coinId = coin.id
        data.walletId = walletUser.id
        const isCoinInWallet = await prisma.coinWallet.findFirst({
            where: {
                AND: [
                    { walletId: walletUser.id },
                    { coinId: coin.id }
                ]
            }
        })
        if (isCoinInWallet) {
            const sumAmountCoin = Number(isCoinInWallet.amount) + Number(req.body.amount)
            await prisma.coinWallet.update({
                where: { id: isCoinInWallet.id },
                data: { amount: sumAmountCoin }
            })
        } else {
            await prisma.coinWallet.create({ data })
        }
        delete data.walletId
        data.price = req.body.price
        data.status = req.body.status
        data.userId = req.user.id
        const response2 = await prisma.transaction.create({ data })
        return res.status(200).json(response2)
    }

    if (req.body.status === 'SELL') {
        const isCoinInWallet = await prisma.coinWallet.findFirst({
            where: {
                AND: [
                    { walletId: walletUser.id },
                    { coinId: coin.id }
                ]
            }
        })

        const currentCoin = await prisma.coinWallet.findFirst({
            include: {
                coin: {
                    select: {
                        symbol: true
                    }
                }
            },
            where: {
                AND: [
                    { walletId: walletUser.id },
                    {
                        coin: {
                            symbol: req.body.symbol
                        }
                    }
                ]
            }
        })


        if (!isCoinInWallet) {
            createError('not have coin in wallet', 401)
        }

        if (currentCoin.amount < req.body.amount) {
            createError('not enough coin', 401)
        }

        const remainCoin = currentCoin.amount - req.body.amount
        const updateCoinWallet = await prisma.coinWallet.update({
            where: {
                id: isCoinInWallet.id
            },
            data: {
                amount: remainCoin
            }
        })

        const updateWallet = await prisma.wallet.update({
            where: {
                id: walletUser.id
            },
            data: {
                amountBaht: Number(currentMoney) + Number(req.body.total)
            }
        })

        const data = {}
        data.amount = req.body.amount
        data.coinId = coin.id
        data.price = req.body.price
        data.status = req.body.status
        data.userId = req.user.id
        const response = await prisma.transaction.create({ data })

        return res.status(200).json(response)
    }
    res.status(400).json({ message: 'not enough money' })
})

exports.getWalletByUserId = catchError(async (req, res, next) => {
    const walletUser = await prisma.wallet.findFirst({ where: { userId: req.user.id } })
    console.log(1);
    res.status(200).json(walletUser)
})

exports.getCoinWalletByUserId = catchError(async (req, res, next) => {
    const walletUser = await prisma.wallet.findFirst({ where: { userId: req.user.id } })
    const response = await prisma.coinWallet.findMany({
        where: { walletId: walletUser.id },
        include: {
            coin: {
                select: { symbol: true, name: true }
            },
            wallet: {
                select: { name: true }
            }
        }
    })
    res.status(200).json(response)
})