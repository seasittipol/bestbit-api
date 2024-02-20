const express = require('express')
const coinController = require('../controllers/coin-controller')

const router = express.Router()

router.get('/', coinController.getAllCoin)

module.exports = router