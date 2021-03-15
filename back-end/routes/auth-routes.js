const express = require('express')
const authCtrl = require('../controllers/auth')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/signup', authCtrl.signUp)
router.post('/login', authCtrl.login)
router.get('/authenticate', auth, authCtrl.authenticate)
module.exports = router