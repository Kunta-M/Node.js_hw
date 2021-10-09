const User = require('../dataBase/User');

module.exports = {
    authorizationMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userByLogin = await User.findOne({ email, password });

            if (!userByLogin) {
                throw new Error('User not found! Check email or password');
            }
            req.user = userByLogin;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
