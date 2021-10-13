const User = require('../dataBase/User');
const { userValidator } = require('../validators');
const { ErrorHandler, errors } = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new ErrorHandler(errors.BAD_REQUEST.message, errors.BAD_REQUEST.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email}).lean();

            if (!userByEmail) {
                throw new ErrorHandler(errors.NOT_FOUND.message, errors.NOT_FOUND.status);
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

            if (!user) {
                throw new ErrorHandler(errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.status);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, errors.BAD_REQUEST.status);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, errors.BAD_REQUEST.status);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            console.log(role);

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(errors.FORBIDDEN.message, errors.FORBIDDEN.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
