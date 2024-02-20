const jwt = require('jsonwebtoken')
const prisma = require('../model/prisma')
const createError = require('../utils/create-error')

const authenticateAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer')) {
        createError('invalid authorization header', 401)
    }
    const token = authorization.split(' ')[1]
    const decodePayload = jwt.verify(token, process.env.SECRETKEY)
    const user = await prisma.user.findFirst({
        where: { email: decodePayload.email }
    })
    // console.log(user);
    if (!user) {
        createError('not found this user', 401)
    }
    if (!user.isAdmin) {
        createError('require admin role', 401)
    }
    delete user.password
    delete user.confirmPassword
    req.admin = user
    next()
}

module.exports = authenticateAdmin