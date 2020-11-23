const express = require('express')

const Task = require('../models/task')

const router = express.Router()

router.get('/:id', async(req,res) => {
    try {
        const { id } = req.params
        const URL = req.baseUrl
        const userId = URL.slice(14,38)
        await Task.findByIdAndRemove({ _id : id })
        res.redirect(`/task-manager/${userId}/add-task/tasks-list`)
    } catch {
        res.redirect(`/task-manager/${userId}/add-task/tasks-list`)
    }
})   

module.exports = router