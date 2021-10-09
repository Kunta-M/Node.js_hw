const User = require('../dataBase/User');

module.exports = {
    authorizationMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userByLogin = await User.findOne({email, password});

            if (!userByLogin) {
                throw new Error('User not found. Check your email or password');
            }
            req.data = userByLogin;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
