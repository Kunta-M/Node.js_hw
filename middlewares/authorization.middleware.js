const passwordService = require('../service/password.service');
const authValidator = require('../validators/authorization.validator');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
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
            next(e);
        }
    }
};
