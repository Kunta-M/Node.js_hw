const router = require('express').Router();

const authController = require('../controllers/authorization.controller');
const authMiddleware = require('../middlewares/authorization.middleware');

router.post('/', authMiddleware.authorizationMiddleware, authController.authorizationController);

module.exports = router;
