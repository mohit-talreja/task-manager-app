const express = require('express')

const flash = require('connect-flash')

const session = require('express-session')

const MongoDBStore = require('connect-mongodb-session')(session)

const PORT = process.env.PORT || 1000

const dbString = 'mongodb://localhost:27017/TaskManagerAppDB'

const app = express()

const store = new MongoDBStore({
    uri : dbString,
    collection : 'sessions'
})

app.set('view engine', 'ejs')

app.use('/uploads/',express.static('uploads'))

app.use(express.urlencoded({ extended : true }))

app.use(session({
    secret : 'topsecret',
    resave : false,
    saveUninitialized : false,
    store : store
}))

app.use(flash())

app.use('/', require('./controllers/index'))

app.use('/login', require('./controllers/login'))

app.use('/signup', require('./controllers/signup'))

app.use('/task-manager', require('./controllers/task-manager'))

app.use('/task-manager/:id/about-us', require('./controllers/about-us'))

app.use('/task-manager/:id/contact-us', require('./controllers/contact-us'))

app.use('/task-manager/:id/logout', require('./controllers/logout'))

app.use('/task-manager/:id/add-task', require('./controllers/add-task'))

app.use('/task-manager/:id/add-task/tasks-list', require('./controllers/tasks-list'))

app.use('/task-manager/:id/add-task/tasks-list/delete-task', require('./controllers/delete-task'))

app.use('/task-manager/:id/add-task/tasks-list/update-task', require('./controllers/update-task'))

app.get('*', (req,res) => {
    res.render('404')
})

app.listen(PORT, console.log(`Task Manager App's server is running on PORT ${PORT}.`))