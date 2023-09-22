const mongoose = require('mongoose');

const blackTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true
    }
})

const blackTokenModel = mongoose.model('blackToken', blackTokenSchema);

module.exports = blackTokenModel;
