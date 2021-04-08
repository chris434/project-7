const bcrypt = require('bcrypt')
const pool = require('../db/db.config')
module.exports = async(req, res, next) => {
    const hashedPassword = req.body.password
    const user_id = req.id
    try {
        console.log(req.body)
        const storedPassword = await pool.query(`SELECT user_password FROM users WHERE user_id =${user_id}`)
        console.log(storedPassword.rows[0].user_password)
        const correctPassword = await bcrypt.compare(hashedPassword, storedPassword.rows[0].user_password)
        if (!correctPassword) return res.status(400).json('invalid password')
        console.log(correctPassword)
        next()
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}