const express = require('express');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const { default: helmet } = require('helmet');
const cors = require('cors');
const connection = require('./configs/db');
const orderRouter = require('./routes/order.routes');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({msg: 'Welcome to E-commerce API with Node js'})
})

app.use('/users', userRouter);              // /users is used to handle user login and register

app.use('/products', productRouter);        // /products is used to handle all products related functionality

app.use('/orders', orderRouter);            // /orders is used to handle all order related functionality

app.use('/*', (req, res)=>{                 // This route is used when a user is hitting on a wrong endpoint
    res.status(404).send({msg: 'Page Not Found'});
})

app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`App is running at: http://localhost:${process.env.PORT}`)
})