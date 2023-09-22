const { Router } = require("express");
const userAuth = require("../middlewares/Auth.middleware");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");

const orderRouter = Router();

orderRouter.post('/placeOrder', userAuth(['admin', 'customer']), async (req, res) => {
    try {
        const {productId, user} = req.body;
        const order = await orderModel.findOne({userId: user._id, status: 'pending'});
        const product = await productModel.findById(productId);
        if(!order){
            let newOrder = new orderModel({userId: user._id, products:[{productId}], price: product.price});
            await newOrder.save();
            return res.status(201).send({msg: 'Product added to cart'});
        }
        await orderModel.findByIdAndUpdate(order._id, {$push:{products: {productId}}, $set: {price: order.price + product.price}});
        res.status(200).send({msg: 'Product added to cart'});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

orderRouter.get('/confirmOrder', userAuth(['admin', 'customer']), async(req, res)=>{
    try {
        const {user} = req.body;
        const order = await orderModel.findOne({userId: user._id, status: 'pending'});
        if(!order) return res.status(400).send({error: 'No order found'});
        await orderModel.findByIdAndUpdate(order._id, {$set: {status: 'complete'}});
        res.status(200).send({msg: 'Order confirm'})
    } catch (err) {
        res.status(500).send({error: err.message});
    }
})

orderRouter.get('/all', userAuth(['admin', 'customer']), async(req, res)=>{
    try {
        const {user} = req.body;
        const order = await orderModel.find({userId: user._id}).populate('products.productId');
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

orderRouter.get('/:orderId', userAuth(['admin', 'customer']), async(req, res)=>{
    try{
        const {orderId} = req.params;
        const order = await orderModel.findById(orderId).populate('products.productId');
        res.status(200).send(order);
    }catch(err){
        res.status(500).send({error: err.message});
    }
})

module.exports = orderRouter