const express = require('express')

const bcrypt = require('bcryptjs')

const multer = require('multer')

const fs = require('fs')

const User = require('../models/user')

const router = express.Router()

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        dir = 'uploads/'
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename : function(req, file, cb){
        const originalName = file.originalname
        const indexOfPeriod = originalName.indexOf('.')
        const fileName = originalName.slice(0,indexOfPeriod)
        const res = originalName.split('.')
        const ext = res[1]
        cb(null, fileName + '-' + new Date().getTime() + '.' + ext)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        console.log('file ext must be .png or .jpeg')
        cb(null, false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5,
    },
    fileFilter : fileFilter
})

router.get('/', (req,res) => {
    res.render('signup', {
        message : req.flash('message')
    })
})

router.post('/', upload.single('profilepic'), async(req,res) => {
    try {
        const { filename } = req.file
        const { username,email,password } = req.body
        const userFound = await User.findOne({ username,email })
        if(!userFound) {
            const hashedPSW = await bcrypt.hash(password, 10)
            const user = new User({
                profilepic : filename,
                username,
                email,
                password : hashedPSW
            })
            await user.save()
            res.redirect('/')
        } else {
            req.flash('message', 'user already exists.')
            res.redirect('/signup') 
        }
    } catch {
        res.redirect('/signup')
    }
})

module.exports = router