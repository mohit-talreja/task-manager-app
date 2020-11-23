const express = require('express')

const User = require('../models/user')

const Task = require('../models/task')

const router = express.Router()

router.get('/', async(req,res) => {
    try {
        const URL = req.baseUrl
        const userId = URL.slice(14,38)
        const user = await User.findById({ _id : userId })
        const username = user.username
        const tasks = await Task.find({ username : username })
        res.render('tasks-list', {
            tasks : tasks,
            user : user
        })
    } catch {
        res.render('404')
    }
})

module.exports = router 