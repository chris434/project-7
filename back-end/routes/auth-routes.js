const express = require('express')
const authCtrl = require('../controllers/auth')
const router = express.Router()

router.post('/signup', authCtrl.signUp)
module.exports = router