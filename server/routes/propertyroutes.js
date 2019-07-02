const express = require('express')
const propertyController = require('../controllers/property')
const router = express.Router()
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/jwt').jwtHelper.verifyToken
router.post('/property', verifyToken, upload, propertyController.createProperty)
router.get('/property', propertyController.getAll)
router.get('/property/:id', propertyController.getSpecificAdvert)
router.patch('/property/:id/price', verifyToken, propertyController.updatePrice)
router.patch('/property/:id/sold', verifyToken, propertyController.changeStatus)
router.delete('/property/:id', verifyToken, propertyController.deleteProperty)
module.exports = router

