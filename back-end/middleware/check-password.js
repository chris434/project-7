const bcrypt = require('bcrypt')
const pool = require('../db/db.config')
module.exports = async(req, res, next) => {
    const hashedPassword = req.body.password
    const user_id = req.id
    try {

        const storedPassword = await pool.query(`SELECT user_password FROM users WHERE user_id =${user_id}`)

        const correctPassword = await bcrypt.compare(hashedPassword, storedPassword.rows[0].user_password)
        if (!correctPassword) {
            throw new Error('invalid password')
        }
        console.log(correctPassword)
        next()
    } catch (e) {
        res.status(401).json(e)
    }
}