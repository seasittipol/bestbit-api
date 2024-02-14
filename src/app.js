require('dotenv').config()
const express = require('express')
const userRoute = require('./routes/user-route')
const authRoute = require('./routes/auth-route')
const cors = require('cors')

const errorHandler = require('./middlewares/error')
const notFoundHandler = require('./middlewares/not-found')

const app = express()
app.use(express.json())
app.use(cors());

app.use('/auth', authRoute)
app.use('/users', userRoute)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log('server running on port ', process.env.PORT))