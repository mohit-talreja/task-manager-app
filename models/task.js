const mongoose = require('mongoose')

require('./db-config')

const taskSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    date : {
        type : Date,
        default : new Date()
    },
    time : {
        type : Date,
        default : new Date()
    }
})

module.exports = new mongoose.model('Task', taskSchema)