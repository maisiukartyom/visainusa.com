const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    paymentID: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    createTime:{
        type: Date,
        required: true,
    },
    updateTime: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Payment', paymentSchema);