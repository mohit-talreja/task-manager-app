const express = require('express')

const bcrypt = require('bcryptjs')

const User = require('../models/user')

const router = express.Router()

router.post('/', async(req,res) => {
    try {
        const { ue,password } = req.body
        const user = await User.findOne({ $or:[ {username : ue}, {email : ue} ] })
        if(!user) {
            req.flash('message', 'user not found.')
            return res.redirect('/')
        }    
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) 
        {
            req.flash('message', `password doesn't match.`)
            return res.redirect('/')
        }
        req.session.isAuth = true
        res.redirect(`/task-manager/${user._id}`)
    } catch {
        res.redirect('/')
    }
})

module.exports = router