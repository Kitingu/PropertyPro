const express = require('express')
const propertyController = require('../controllers/property')
const router = express.Router()
const checkAgent = require('../middlewares/agents')
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/jwt').jwtHelper.verifyToken
router.post('/property', verifyToken, checkAgent, upload, propertyController.createProperty)
router.get('/property', propertyController.getAll)
router.get('/property/:id', propertyController.getSpecificAdvert)
router.patch('/property/:id/price', verifyToken, checkAgent, propertyController.updatePrice)
router.patch('/property/:id/sold', verifyToken, checkAgent, propertyController.changeStatus)
router.delete('/property/:id', verifyToken, checkAgent, propertyController.deleteProperty)
router.patch('/property/:id/flag', verifyToken, propertyController.flagProperty)
module.exports = router

