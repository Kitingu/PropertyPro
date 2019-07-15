const express = require('express');
const propertyController = require('../controllers/property');

const router = express.Router();
const checkAgent = require('../middlewares/agents');
const upload = require('../middlewares/upload');
const { checkIdType, handlers } = require('../middlewares/error-handler');
const { verifyToken } = require('../middlewares/jwt').jwtHelper;
const Validate = require('../middlewares/validators')

const { methodNotAllowed } = handlers;

router.route('/property')
  .post(verifyToken, upload, Validate.property, checkAgent, propertyController.createProperty)
  .get(propertyController.getAll)
  .all(methodNotAllowed);

router.route('/property/:id')
  .get(checkIdType, propertyController.getSpecificAdvert)
  .delete(checkIdType, verifyToken, checkAgent, propertyController.deleteProperty)
  .all(methodNotAllowed);

router.route('/property/:id/price')
  .patch(checkIdType, verifyToken,checkAgent, Validate.priceUpdate , propertyController.updatePrice)
  .all(methodNotAllowed);

router.route('/property/:id/sold')
  .patch(checkIdType, verifyToken, checkAgent, propertyController.changeStatus)
  .all(methodNotAllowed);

router.route('/property/:id/flag')
  .patch(checkIdType, verifyToken, Validate.flag, propertyController.flagProperty)
  .all(methodNotAllowed);

module.exports = router;
