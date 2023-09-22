const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");

const placeOrder = async (req, res) => {
    try {
        const { user } = req.body;
        const { productId } = req.params;
        const order = await orderModel.findOne({ userId: user._id, status: 'pending' });
        const product = await productModel.findById(productId);
        if (!order) {
            let newOrder = new orderModel({ userId: user._id, products: [{ productId }], price: product.price });
            await newOrder.save();
            return res.status(201).send({ msg: 'Product added to cart' });
        }
        await orderModel.findByIdAndUpdate(order._id, { $push: { products: { productId } }, $set: { price: order.price + product.price } });
        res.status(200).send({ msg: 'Product added to cart' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        const { user } = req.body;
        const { productId } = req.params;
        const order = await orderModel.findOne({ userId: user._id, status: 'pending' });
        if (!order) return res.status(400).send({ msg: 'No pending order found' });
        const newProductList = order.products.filter((el) => el.productId !== productId);
        await orderModel.findByIdAndUpdate(order._id, { $set: { products: newProductList } });
        res.status(500).send({ msg: 'Product Removed' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const increaseQty = async (req, res) => {
    try {
        const { user } = req.body;
        const { productId } = req.params;
        const order = await orderModel.findOne({ userId: user._id, status: 'pending' });
        if (!order) return res.status(400).send({ msg: 'No pending order found' });
        const product = await productModel.findById(productId);
        await orderModel.findByIdAndUpdate(order._id, { $push: { products: { productId } }, $set: { price: order.price + product.price } })
        res.status(200).send({ msg: 'Quantity Increased' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const decreaseQty = async (req, res) => {
    try {
        const { user } = req.body;
        const { productId } = req.params;
        const order = await orderModel.findOne({ userId: user._id, status: 'pending' });
        if (!order) return res.status(400).send({ msg: 'No pending order found' });
        const product = await productModel.findById(productId);
        let count = 0;
        let productList = [];
        for (let i = 0; i < order.products.length; i++) {
            if (order.products[i].productId === productId && count === 0) {
                count++;
                continue;
            } else if (order.products[i].productId !== productId)
                productList.push(order.products[i]);
            else if (order.products[i].productId === productId && count !== 0)
                productList.push(order.products[i]);
        }
        await orderModel.findByIdAndUpdate(order._id, { $set: { products: productList }, $set: { price: order.price - product.price } })
        res.status(200).send({ msg: 'Quantity Increased' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const deleteOrder = async(req, res)=>{
    try{
        const {user} = req.body;
        const {orderId} = req.params;
        const order = await orderModel.find({_id: orderId, userId: user._id});
        if(!order) return res.status(400).send({msg: 'No order found'});
        await orderModel.findByIdAndDelete(orderId);
        res.status(200).send({msg: 'Order Deleted'});
    }catch(err){
        res.status(500).send({msg: err.message});
    }
}

const confirmOrder = async (req, res) => {
    try {
        const { user } = req.body;
        const order = await orderModel.findOne({ userId: user._id, status: 'pending' });
        if (!order) return res.status(400).send({ error: 'No order found' });
        await orderModel.findByIdAndUpdate(order._id, { $set: { status: 'complete' } });
        res.status(200).send({ msg: 'Order confirm' })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const allOrders = async (req, res) => {
    try {
        const { user } = req.body;
        const order = await orderModel.find({ userId: user._id }).populate('products.productId');
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const orderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId).populate('products.productId');
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

module.exports = {
    orderDetails, allOrders, confirmOrder, deleteOrder, decreaseQty, increaseQty, removeProduct, placeOrder
}