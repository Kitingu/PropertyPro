const express = require('express')
const userController = require('../controllers/auth')
const router = express.Router()

router.post('/auth/signup', userController.signUp)
module.exports = router
