const { hash, compare } = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { Router } = require("express");
const userModel = require("../models/user.model");
require('dotenv').config();

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let userExists = await userModel.findOne({ email });
        if (userExists) return res.status(400).send({ msg: 'User Already Registered' });
        password = await hash(password, Number(process.env.SALT_ROUNDS))
        let newUser = new userModel({ name, email, password });
        await newUser.save();
        res.status(201).send({ msg: 'User Added' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let userExists = await userModel.findOne({ email });
        if (!userExists) return res.status(400).send({ msg: 'User Not Registered' });
        let decode = await compare(password, userExists.password);
        if (decode) {
            let token = sign({ userId: userExists._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            return res.status(200).send({ msg: 'Login Successful', token });
        }
        return res.status(400).send({ error: 'Wrong Credentials' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = userRouter;