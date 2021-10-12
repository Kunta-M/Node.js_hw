const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find().lean();

            const normalizedUser = users.map(user => userUtil.userNormalizator(user));
          
            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const normalizedUser = userUtil.userNormalizator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const normalizedUser = userUtil.userNormalizator(JSON.parse(JSON.stringify(newUser)));

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(
                user_id,
                { name: req.body.name },
                {new: true})
                .lean();

            const normalizedUser = userUtil.userNormalizator(updatedUser);

            res.json(normalizedUser);

        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await User.deleteOne({ _id: user_id });

            res.json('User is deleted');
        } catch (e) {
            next(e);
        }
    }
};
