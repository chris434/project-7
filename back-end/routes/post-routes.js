const express = require('express')
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post')
const router = express.Router()


router.post('/createpost', auth, postCtrl.createPost)
router.get('/getposts', auth, postCtrl.getPosts)
module.exports = router