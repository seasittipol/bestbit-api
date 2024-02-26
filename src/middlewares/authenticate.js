const jwt = require('jsonwebtoken')
const prisma = require('../model/prisma')
const createError = require('../utils/create-error')
const catchError = require('../utils/catch-error')

const authenticate = catchError(async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer')) {
        createError('invalid authorization header', 401)
    }
    const token = authorization.split(' ')[1]
    const decodePayload = jwt.verify(token, process.env.SECRETKEY)
    const user = await prisma.user.findFirst({
        where: { email: decodePayload.email }
    })
    if (!user) {
        createError('not found this user', 401)
    }
    delete user.password
    delete user.confirmPassword
    req.user = user
    next()
})

module.exports = authenticate