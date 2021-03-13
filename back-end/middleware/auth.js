const jwt = require('jsonwebtoken')
module.exports = async(req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)

        if (!decodedToken) {
            return res.json('unauthorized user')
        }
        req.id = decodedToken.id
        next()
    } catch (e) {
        res.status(202).json(e)
    }
}