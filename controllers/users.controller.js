const path = require('path');

const {read, write} = require('../helper/users.helper');

const file = path.join('dataBase', 'users.json');

module.exports = {
    getUsers: async (req, res) => {
        const data = await read(file);

        res.json(data);
    },

    getUserById: async (req, res) => {
        const { user_id } = req.params;
        const data = await read(file);

        res.json(data[user_id - 1]);
    },

    createUser: async (req, res) => {
        const data = await read(file);

        const lastId = data.sort((a,b) => a.id - b.id)[data.length -1].id;
        let id = 1;
        if (lastId) {
            id = +lastId +1;
        }

        data.push({ id, ...req.body });
        await write(file, data);

        res.json(data);
    },

    deleteUser: async (req, res) => {
        const { user_id } = req.params;

        const data = await read(file);

        const currentUsers = data.filter(user => user.id !== +user_id);

        await write(file, currentUsers);

        res.json(data);
    }
};