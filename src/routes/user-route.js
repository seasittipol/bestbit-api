const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const userController = require('../controllers/user-controller')

// router.post('/', userController.create)
router.patch('/',
    upload.fields([{ name: 'profileImage', maxCount: 1 }]),
    userController.updateUserById
)

module.exports = router