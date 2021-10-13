const { authValidator } = require('../validators');
const { ErrorHandler, errors } = require('../errors');
const passwordService = require('../service/password.service');

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
                throw new ErrorHandler(errors.NOT_FOUND.message, errors.NOT_FOUND.status);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
