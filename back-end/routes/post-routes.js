const express = require('express')
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post')
const router = express.Router()


router.post('/createpost', auth, postCtrl.createPost)
router.get('/posts', auth, postCtrl.getPosts)
router.get('/post/:id', auth, postCtrl.getPost)
module.exports = router