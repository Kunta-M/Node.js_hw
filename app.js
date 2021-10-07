const express = require('express');
const userRouter = require('./routes/users.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('Listen 5000');
});