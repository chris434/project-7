const express = require('express')
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post')
const router = express.Router()
const multer = require('../middleware/multer')
const fileUpload = require('../middleware/upload-file')



router.post('/createpost', auth, multer.single('image'), fileUpload, postCtrl.createPost)
router.get('/posts', auth, postCtrl.getPosts)
router.get('/post/:id', auth, postCtrl.getPost)
module.exports = router