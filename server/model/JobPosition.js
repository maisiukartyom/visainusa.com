const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPositionSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    wage: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    coverImage: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    agencies:{
        type: [String]
    }
});
  
module.exports = mongoose.model('JobPosition', jobPositionSchema);