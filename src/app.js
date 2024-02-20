require('dotenv').config()
const express = require('express')
const userRoute = require('./routes/user-route')
const authRoute = require('./routes/auth-route')
const coinRoute = require('./routes/coin-route')
const adminRoute = require('./routes/admin-route')
const cors = require('cors')

const errorHandler = require('./middlewares/error')
const notFoundHandler = require('./middlewares/not-found')
const authenticate = require('./middlewares/authenticate')
const authenticateAdmin = require('./middlewares/authenticate-admin')

const app = express()
app.use(express.json())
app.use(cors());

app.use('/auth', authRoute)
app.use('/users', authenticate, userRoute)
app.use('/coins', coinRoute)
app.use('/admins', authenticateAdmin, adminRoute)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log('server running on port ', process.env.PORT))