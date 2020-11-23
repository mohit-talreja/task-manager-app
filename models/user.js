const mongoose = require('mongoose')

const validator = require('validator')

require('./db-config')

const userSchema = new mongoose.Schema({
    profilepic : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        validate : function(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email!')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
    }
})

module.exports = new mongoose.model('User', userSchema)