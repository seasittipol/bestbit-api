const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const userController = require('../controllers/user-controller')

// router.post('/', userController.create)
router.patch('/',
    upload.fields([{ name: 'profileImage', maxCount: 1 }]),
    userController.updateUserById
)

router.patch('/deposit',
    upload.fields([{ name: 'depositImage', maxCount: 1 }]),
    userController.depositById
)

router.get('/transaction', userController.getTransaction)
router.post('/spot-trade', userController.spotTrade)

router.get('/wallet-balance', userController.getWalletByUserId)
router.get('/wallet-coin', userController.getCoinWalletByUserId)

module.exports = router