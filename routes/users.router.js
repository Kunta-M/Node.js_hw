const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.isUserBodyValid, userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userMiddleware.checkUserById, userController.getUserById);
router.put('/:user_id', userMiddleware.isUpdateBodyValid, userMiddleware.checkUserById, userController.updateUser);
router.delete('/:user_id', userMiddleware.checkUserById, userController.deleteUser);

module.exports = router;
