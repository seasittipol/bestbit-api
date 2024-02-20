const express = require('express')
const adminController = require('../controllers/admin-controller')

const router = express.Router()

router.get('/', adminController.getCoin)
router.post('/create-coin', adminController.createCoin)
router.patch('/update-coin', adminController.updateCoin)
router.delete('/delete-coin', adminController.deleteCoin)

module.exports = router