const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'product'}
        }
    ], 
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending'
    }
})

const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel;
