const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const { ADMIN, USER } = require('../configs/user.roles.enum');

router.post(
    '/',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserRole([
        ADMIN,
        USER
    ]),
    authMiddleware.isUserBodyValidForAuth,
    authMiddleware.isPasswordsMatched,
    authController.login);

module.exports = router;
