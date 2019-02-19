const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    foods: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Food'
        }
    ]
})

module.exports = mongoose.model('Account', accountSchema);