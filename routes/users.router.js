const router = require('express').Router();

const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);
router.get('/:user_id', userController.getUserById);

module.exports = router;
