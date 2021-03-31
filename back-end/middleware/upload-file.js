require('dotenv').config()
const { Storage } = require('@google-cloud/storage');

const gc = new Storage({ projectId: process.env.PROJECT_ID, credentials: { client_email: process.env.CLIENT_EMAIL, private_key: process.env.PRIVATE_KEY } })


const uploadFile = async(req, res, next) => {

    try {
        if (req.file) {
            const bucket = gc.bucket('post-images-co')
            const name = Date.now() + req.file.originalname.split(' ').join('_')
            await bucket.file(name).save(req.file.buffer)
            req.file = `https://storage.googleapis.com/post-images-co/${name}`
        }

        next()
    } catch (e) {
        res.status(400).json(e)
    }
}
module.exports = uploadFile