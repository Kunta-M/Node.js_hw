const userUtil = require('../util/user.util');

module.exports = {
    login: (req, res, next) => {
        try {
            const normalizedUser = userUtil.userNormalizator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },
};
