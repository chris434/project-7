const express = require('express')
const authCtrl = require('../controllers/auth')
const router = express.Router()

router.post('/signup', authCtrl.signUp)
router.post('/login', authCtrl.login)
module.exports = router