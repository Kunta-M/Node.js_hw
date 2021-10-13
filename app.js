const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, MONGO_CONNECT_URL } = require("./configs/config");
const { authRouter, userRouter } = require('./routes');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({message: err.message});
});

app.listen(PORT, () => {
    console.log(`Listen ${PORT}`);
});
