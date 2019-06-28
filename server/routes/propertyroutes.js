const express = require('express')
const propertyController = require('../controllers/property')
const router = express.Router()
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/jwt').jwtHelper.verifyToken
router.post('/property', verifyToken, upload, propertyController.createProperty)


module.exports = router

