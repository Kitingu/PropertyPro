const express = require('express');
const userController = require('../controllers/auth');
const router = express.Router()
const Validate = require('../middlewares/validators')

// swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json')

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));


router.post('/auth/signup', Validate.user, userController.signUp);
router.post('/auth/signin', userController.login);

module.exports = router;
