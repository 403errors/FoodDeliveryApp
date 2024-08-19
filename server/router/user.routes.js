const express= require('express');
const userRouter = express.Router();
const jwtVerify = require('../middleware/jwtToken.middlware')
const {register,login}=require('../controller/user.controller')

userRouter.post('/api/register',register);

userRouter.post('/api/login',login);


module.exports = userRouter;

