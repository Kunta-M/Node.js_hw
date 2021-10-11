const router = require('express').Router();

const authController = require('../controllers/authorization.controller');
const authMiddleware = require('../middlewares/authorization.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    authMiddleware.authorizationMiddleware,
    authController.authorizationController);

module.exports = router;
