const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db/db.config')
require('dotenv').config()


exports.signUp = async(req, res) => {
    const { first_name, last_name, email, password } = req.body
    const profileImage = 'http://localhost:5000/default_images/blank-profile.png'

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = `INSERT INTO users (first_name,last_name,email,user_password,profile_image) values('${first_name}','${last_name}','${email}','${hashedPassword}','${profileImage}')`
        await pool.query(createUser)
        return res.status(200).json('user created')
    } catch (e) {
        if (e.constraint === 'users_email_key') {
            return res.status(401).json({ error: 'email', details: 'this email already exists' })
        }
        res.status(202).json(e)
    }
}
exports.login = async(req, res) => {
    const { email, password } = req.body
    const lookUpUser = `SELECT * FROM users WHERE email='${email}'`
    try {
        const user = await pool.query(lookUpUser)

        if (!user.rowCount) {
            throw new Error('this email is not registered')
        }

        const correctPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!correctPassword) {
            throw new Error('email or password incorrect')
        }
        const payload = { id: user.rows[0].user_id }
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '24h' })

        res.status(200).json({ token: token })
    } catch (e) {
        console.log(e)
        return res.status(401).json(e.message)
    }
}
exports.authenticate = async(req, res) => {
    try {
        const user = await pool.query(`SELECT profile_image, first_name, last_name FROM users WHERE user_id = ${req.id}`)

        const data = user.rows[0]
        return res.status(200).json(data)
    } catch (e) {

    }
}