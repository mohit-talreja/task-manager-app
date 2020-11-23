const express = require('express')

const User = require('../models/user')

const router = express.Router()

const isAuth = (req,res,next) => {
    if(req.session.isAuth) {
        next()
    }
    else {
        return res.redirect('/')
    }
}

router.get('/:id', isAuth, async(req,res) => {
    try {
        const { id } = req.params
        const user = await User.findById({ _id : id })
        res.render('task-manager',{
            user : user
        })
    } catch {
        res.render('404')
    }
})

module.exports = router