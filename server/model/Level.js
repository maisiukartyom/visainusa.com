const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    levelNumber: {
        type: Number,
        required: true,
        unique: true
    },
    cost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Level', levelSchema);