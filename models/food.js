const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    origin: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
})

module.exports = mongoose.model('Food', foodSchema);