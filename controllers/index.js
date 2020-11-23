const express = require('express')

const router = express.Router()

router.get('/', (req,res) => {
    res.render('login', {
        message : req.flash('message')
    })
})

module.exports = router