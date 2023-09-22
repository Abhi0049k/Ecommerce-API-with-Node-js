const { Router } = require("express");
const { register, login } = require("../controllers/user.controllers");
require('dotenv').config();

const userRouter = Router();

userRouter.post('/register', register);

userRouter.post('/login', login);

module.exports = userRouter;