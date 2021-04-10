const jwt = require('jsonwebtoken')
module.exports = async(req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)

        if (!decodedToken) {
            throw new Error('unauthorized user')
        }
        req.id = decodedToken.id
        next()
    } catch (e) {

        return res.status(401).json(e)
    }
}