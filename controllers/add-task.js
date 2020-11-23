const express = require('express')

const User = require('../models/user')

const Task = require('../models/task')

const router = express.Router()

router.get('/', async(req,res) => {
    try {
        const URL = req.baseUrl
        const userId = URL.slice(14,38)
        const user = await User.findById({ _id : userId })
        res.render('add-task', {
            user : user,
            message : req.flash('message')
        })
    } catch {
        res.render('404')
    }
})

router.post('/', async(req,res) => {
    try {
        const URL = req.baseUrl
        const userId = URL.slice(14,38)
        const user = await User.findById({ _id : userId })
        const username = user.username
        const { title,description } = req.body
        const taskFound = await Task.findOne({ title,username })
        if(!taskFound) {
            const task = new Task({
                username : username,
                title,
                description
            })
            await task.save()
            res.redirect(`/task-manager/${userId}/add-task/tasks-list`)
        } else {
            req.flash('message', 'task already added.')
            res.redirect(`/task-manager/${userId}/add-task`)
        }
    } catch {
        res.redirect(`/task-manager/${userId}/add-task`)
    }
})

module.exports = router