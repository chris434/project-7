const express = require('express')
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post')
const router = express.Router()

router.get('/forum', auth, postCtrl.getPosts)
module.exports = router