const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const catchError = require('../utils/catch-error')
const prisma = require('../model/prisma')
const createError = require('../utils/create-error')

exports.register = catchError(async (req, res, next) => {
    if (req.body.email.trim() === '' || req.body.email.indexOf('@') < 0) {
        createError('email not match', 401)
    }
    if (req.body.password.trim() === '' || req.body.password.length < 6) {
        createError('require password more than 5 character', 401)
    }
    const hashed = await bcrypt.hash(req.body.password, 10)
    console.log(hashed);
    // const accessToken = jwt.sign(req.body, process.env.SECRETKEY, { expiresIn: '1h' })
    const newUser = req.body
    const name = 'user' + Math.floor(((Math.random() * 8) + 1) * 1000000)
    newUser.name = name
    newUser.password = hashed
    const response = await prisma.user.create({ data: newUser })
    console.log(response);

    delete newUser.password
    delete newUser.confirmPassword
    res.status(201).json({ newUser })
})

exports.login = catchError(async (req, res, next) => {
    const findUser = await prisma.user.findFirst({ where: { email: req.body.email } })
    if (!findUser) {
        createError('have not email', 401)
    }
    const checkPassword = await bcrypt.compare(req.body.password, findUser.password)
    if (!checkPassword) {
        createError('password is not match', 401)
    }
    const accessToken = jwt.sign(req.body, process.env.SECRETKEY, { expiresIn: '3h' })
    const loginUser = req.body
    loginUser.name = findUser.name
    delete loginUser.password
    res.status(201).json({ accessToken, user: loginUser })
})

exports.getMe = catchError(async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer')) {
        createError('invalid authorization header', 401)
    }
    const token = authorization.split(' ')[1]
    const decodePayload = jwt.verify(token, process.env.SECRETKEY)
    console.log(decodePayload);
    const user = await prisma.user.findFirst({
        where: { email: decodePayload.email }
    })
    if (!user) {
        createError('not found this user', 401)
    }
    delete user.password
    delete user.confirmPassword
    res.status(200).json({ user })
})