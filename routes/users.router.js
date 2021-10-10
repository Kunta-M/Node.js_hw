const router = require('express').Router();

const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.isUserBodyValid, userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userMiddleware.checkUserByIdMiddleware, userController.getUserById);
router.delete('/:user_id', userMiddleware.checkUserByIdMiddleware, userController.deleteUser);

module.exports = router;
