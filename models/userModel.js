const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const user = new Schema({
    name : {
        type: String,
        required : true,
        unique: true,
        minlength : 4,
        // validate (value) {
        //     if(value.includes('&')) {   // Revoir avec des symboles
        //         throw new Error('Name can\'t contains "&"')
        //     }
        // }

    },
    // pseudo : {
    //     type : String,
    //     required : true,
    //     unique : true,
    //     // lowercase : true,
    //     // minlength : 6,
    //     // validate (value) {
    //     //     if(value.toLowerCase().includes('pseudo')) {
    //     //         throw new Error('Password can\'t be pseudo')
    //     //     }
    //     // }

    // },
    phone : {
        type: Number,
        required : true,
        unique: true,
        // validate (value) {
        //     if(value.includes('NUMBER')) {   // Revoir avec des symboles
        //         throw new Error('Name can\'t contains "&"')
        //     }
        // }
    },
    email : {
        type: String,
        required : true,
        unique: true
        // validate (value) {
        //     if(value.includes('EMAIL')) {   // Revoir avec des symboles
        //         throw new Error('Name can\'t contains "&"')
        //     }
        // }
    },
    password : {
        type: String,
        required : true,
        minlength : 8,
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

user.plugin(uniqueValidator);
module.exports = mongoose.model('User', user)