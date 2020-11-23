const mongoose = require('mongoose')

const dbString = 'mongodb://localhost:27017/TaskManagerAppDB'

mongoose.connect(dbString, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
})
    .then(res => console.log('Connected to MongoDB.'))
    .catch(err => console.log('Error in connecting to MongoDB!'))