const express = require('express')

const User = require('../models/user')

const router = express.Router()

router.get('/', async(req,res) => {
    try {
        const URL = req.baseUrl
        const userId = URL.slice(14,38)
        const user = await User.findById({ _id : userId })
        res.render('about-us', {
            user : user
        })
    } catch {
        res.render('404')
    }
})

module.exports = router