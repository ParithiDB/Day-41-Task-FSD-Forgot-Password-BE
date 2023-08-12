const express = require('express');
const { tokenGate } = require('./Middleware/AuthGates');
const APP_SERVER = express();


APP_SERVER.get('/',(req,res,next) => {
    res.send('<h1>DAY 41 TASK PASSWORD RESET</h1>')
});
APP_SERVER.use('/signup', require('./controllers/SignUp.controller'));
APP_SERVER.use('/users', require('./controllers/users.controller'));
APP_SERVER.use('/login', require('./controllers/Login.controller'));
APP_SERVER.use('/forgot', require('./controllers/Forgot.controller'));
APP_SERVER.use('/reset', require('./controllers/reset.controller'));

module.exports = APP_SERVER;