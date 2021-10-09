const express = require('express');
const mongoose = require('mongoose');

const {PORT, MONGO_CONNECT_URL} = require("./configs/config");
const useRouter = require('./routes/users.router');
const authRouter = require('./routes/authorization.router');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', useRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Listen ${PORT}`);
});
