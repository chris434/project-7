const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db/db.config')
require('dotenv').config()

exports.signUp = async(req, res) => {
    const { first_name, last_name, email, password } = req.body
    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const file = '../default_images/blank-profile.png'
        const createUser = `INSERT INTO users (first_name,last_name,email,user_password,profile_image) values('${first_name}','${last_name}','${email}','${hashedPassword}','${file}')`
        await pool.query(createUser)
        return res.status(200).json('user created')
    } catch (e) {
        if (e.constraint === 'users_email_key') {
            return res.status(202).json({ error: 'email', details: 'this email already exists' })
        }
        res.status(202).json(e)
    }
}
exports.login = async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const lookUpUser = `SELECT * FROM users WHERE email='${email}'`
    try {
        const user = await pool.query(lookUpUser)
        console.log(user.rows[0].user_id)
        const correctPassword = await bcrypt.compare(password, user.rows[0].user_password)
        if (!correctPassword) return res.status(202).json('email or password incorrect')
        const token = jwt.sign({ userId: user.user_id }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
        res.status(200).json({
            userId: user.rows[0].user_id,
            token: token
        })
    } catch (e) {
        console.log(e)
    }

}