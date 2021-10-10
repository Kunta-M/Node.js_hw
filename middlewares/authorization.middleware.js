const User = require('../dataBase/User');
const passwordService = require('../service/password.service');

module.exports = {
    authorizationMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userByLogin = await User.findOne({ email });

            if (!userByLogin) {
                throw new Error('User not found! Check email or password');
            }

            await passwordService.compare(password, userByLogin.password);

            req.user = userByLogin;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
