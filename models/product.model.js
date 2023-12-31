const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel
