const User = require('../dataBase/User');

module.exports = {
    authorizationMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });

            if (!userByEmail) {
                throw new Error('User not found. Check your email');
            }

            if (req.body.password !== userByEmail.password) {
                throw new Error('Password is not correct');
            }

            req.data = userByEmail;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
