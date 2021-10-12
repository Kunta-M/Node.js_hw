const router = require('express').Router();

const authController = require('../controllers/authorization.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post(
    '/',
    userMiddleware.isUserPresent,
    authMiddleware.isUserBodyValidForAuth,
    authMiddleware.isPasswordsMatched,
    authController.login);

router.post('/logout', authController.logout);

module.exports = router;
