const express = require('express');
const userController = require('../controllers/auth');

// swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json')
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.post('/auth/signup', userController.signUp)
router.post('/auth/signin', userController.login)

router.post('/auth/signup', userController.signUp);
router.post('/auth/signin', userController.login);

module.exports = router;
