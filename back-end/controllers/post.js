const pool = require('../db/db.config')
const fs = require('fs')


exports.getPosts = async(req, res) => {
    try {
        console.log('k')
        const user = await pool.query(`SELECT * FROM users WHERE user_id = ${req.id}`)
        const data = user.rows[0]
        return res.status(200).json({ image: data.profile_image, firstName: data.first_name, lastName: data.last_name })
    } catch (e) {

    }
}
exports.createPost = async(req, res) => {
    const content = req.body.data
    const userId = req.id
    try {
        await pool.query(`INSERT INTO posts (post_content,user_id) values('${content}',${userId})`)
        return res.status(200).json('post successful')

    } catch (e) {
        res.status(400).json(e)
    }
}