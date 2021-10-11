const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const authValidator = require('../validators/authorization.validator');

module.exports = {
    authorizationMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userByLogin = await User.findOne({ email });

            if (!userByLogin) {
                throw new Error('Wrong email or password');
            }

            await passwordService.compare(password, userByLogin.password);

            req.user = userByLogin;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValidForAuth: (req, res, next) => {
        try {
            const { error, value } = authValidator.authorizationValidator.validate(req.body);

            if (error) {
                throw new Error('Wrong email or password');
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
