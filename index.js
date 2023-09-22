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

app.use('/users', userRouter);

app.use('/products', productRouter);

app.use('/orders', orderRouter);

app.use('/*', (req, res)=>{
    res.status(404).send({msg: 'Page Not Found'});
})

app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`App is running at: http://localhost:${process.env.PORT}`)
})