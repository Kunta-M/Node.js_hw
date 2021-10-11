const userUtil = require('../util/user.util');

module.exports = {
    authorizationController: (req, res) => {
        try {
            const normalizedUser = userUtil.userNormalizator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    }
};
