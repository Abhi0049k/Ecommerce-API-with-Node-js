const { Router } = require("express");
const { register, login } = require("../controllers/user.controllers");
require('dotenv').config();

const userRouter = Router();

userRouter.post('/register', register);             // This route is used for user registration

userRouter.post('/login', login);                   // This route is used for user login

module.exports = userRouter;