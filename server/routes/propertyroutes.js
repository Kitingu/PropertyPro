const express = require('express')
const propertyController = require('../controllers/property')
const router = express.Router()
const checkAgent = require('../middlewares/agents')
const upload = require('../middlewares/upload')
const { checkIdType, handlers } = require('../middlewares/error-handler')
const verifyToken = require('../middlewares/jwt').jwtHelper.verifyToken
const methodNotAllowed = handlers.methodNotAllowed

router.route('/property')
    .post(verifyToken, checkAgent, upload, propertyController.createProperty)
    .get(propertyController.getAll)
    .all(methodNotAllowed)

router.route('/property/:id')
    .get(checkIdType, propertyController.getSpecificAdvert)
    .delete(checkIdType, verifyToken, checkAgent, propertyController.deleteProperty)
    .all(methodNotAllowed)

router.route('/property/:id/price')
    .patch(checkIdType, verifyToken, checkAgent, propertyController.updatePrice)
    .all(methodNotAllowed)

router.route('/property/:id/sold')
    .patch(checkIdType, verifyToken, checkAgent, propertyController.changeStatus)
    .all(methodNotAllowed)

router.route('/property/:id/flag')
    .patch(checkIdType, verifyToken, propertyController.flagProperty)
    .all(methodNotAllowed)
    
module.exports = router

