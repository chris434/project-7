const express = require('express')
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post')
const router = express.Router()
const multer = require('../middleware/multer')
const fileUpload = require('../middleware/upload-file')
const passwordCheck = require('../middleware/check-password')



router.post('/createpost', auth, multer.single('image'), fileUpload, postCtrl.createPost)
router.post('/like/:id', auth, postCtrl.postLikes)
router.post('/comment/:id', auth, postCtrl.postComment)
router.get('/posts', auth, postCtrl.getPosts)
router.get('/post/:id', auth, postCtrl.getPost)
router.delete('/delete-account', auth, passwordCheck, postCtrl.deleteAccount)



module.exports = router