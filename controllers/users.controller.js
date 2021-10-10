const User = require('../dataBase/User');
const passwordService = require('../service/password.service');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
          
            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            res.json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            await User.deleteOne({ _id: user_id });

            res.json('User is deleted');
        } catch (e) {
            res.json(e.message);
        }
    }
};
