const mongoose = require('mongoose')
const User = require('./userModel')

const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const token = new Schema({
    token : {
        type: String,
        required : true,
        unique: true,
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // ref: User._id,
        required : true,
    },
    expireIn : {
        type: Date,
        required : true,
        // default: 7*24*60*60*1000,
        default: Date.now() + 7*24*60*60*1000,
    },
    created_at : {
        type: Date,
        required : true,
        default: Date.now,
    },
    updated_at : {
        type: Date,
        required : true,
        default: Date.now,
    },
});

token.plugin(uniqueValidator);
module.exports = mongoose.model('Token', token)