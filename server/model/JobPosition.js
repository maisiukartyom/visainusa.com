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
    }
});
  
module.exports = mongoose.model('JobPosition', jobPositionSchema);