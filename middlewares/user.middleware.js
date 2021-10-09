const User = require('../dataBase/User');

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
            const user = await User.findById(user_id);

            if (!user) {
                throw new Error ('User is not exists');
            }
            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
