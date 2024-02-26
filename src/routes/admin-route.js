const express = require('express')
const adminController = require('../controllers/admin-controller')

const router = express.Router()

router.get('/', adminController.getCoin)
router.post('/create-coin', adminController.createCoin)
router.patch('/update-coin', adminController.updateCoin)
router.delete('/delete-coin', adminController.deleteCoin)

router.get('/transaction', adminController.getTransaction)

router.post('/wallet', adminController.createWallet)
router.patch('/wallet', adminController.topupMoneyByUserId)

module.exports = router