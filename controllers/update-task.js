const express = require('express')

const User = require('../models/user')

const Task = require('../models/task')

const router = express.Router()

router.get('/:id', async(req,res) => {
    try {
        const { id } = req.params
        const task = await Task.findById({ _id : id })
        const URL = req.baseUrl
        const userId = URL.slice(14,38)
        const user = await User.findById({ _id : userId })
        res.render('add-task-edit', {
            task : task,
            user : user
        })
    } catch {
        res.redirect(`/task-manager/${userId}/add-task/tasks-list`)
    }
})

router.post('/:id', async(req,res) => {
    try {
        const { id } = req.params
        const { title,description } = req.body
        await Task.findByIdAndUpdate({ _id : id },{
            title,
            description
        })
        const URL = req.baseUrl
        const userId = URL.slice(14,38)
        res.redirect(`/task-manager/${userId}/add-task/tasks-list`)
    } catch {
        res.render('add-task-edit')
    }
})

module.exports = router