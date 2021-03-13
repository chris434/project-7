const pool = require('../db/db.config')
const fs = require('fs')


exports.getPosts = async(req, res) => {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE user_id = ${req.id}`)
        const data = user.rows[0]
        return res.status(200).json({ image: data.profile_image, firstName: data.first_name, lastName: data.last_name })
    } catch (e) {

    }
}