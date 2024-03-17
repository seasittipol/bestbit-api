const express = require('express')
const upload = require('../middlewares/upload')
const adminController = require('../controllers/admin-controller')

const router = express.Router()

router.get('/', adminController.getCoin)
router.post('/create-coin', adminController.createCoin)
router.patch('/create-coin',
    upload.fields([{ name: 'iconImage', maxCount: 1 }]),
    adminController.createCoinIcon
)
router.patch('/update-coin', adminController.updateCoin)
router.delete('/delete-coin', adminController.deleteCoin)

router.get('/transaction', adminController.getTransaction)

router.post('/wallet', adminController.createWallet)
router.patch('/wallet', adminController.topupMoneyByUserId)

router.get('/user', adminController.getAllUser)
router.patch('/user', adminController.updateUserById)
router.delete('/user/:userId', adminController.delteUserById)
module.exports = router