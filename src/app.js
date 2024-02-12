require('dotenv').config()
const express = require('express')
const userRoute = require('./routes/user-route')

const app = express()
app.use(express.json())

app.use('/users', userRoute)

app.listen(process.env.PORT, () => console.log('server running on port ', process.env.PORT))