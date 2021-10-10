const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const userUtil = require('../util/user.util');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new Error('User already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserByIdMiddleware: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            let user = await User.findById(user_id).lean();

            if (!user) {
                throw new Error ('User is not exists');
            }

            user = userUtil.userNormalizator(user);

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
