const fs = require('fs')
const bcrypt = require('bcrypt')
const pool = require('../db/db.config')

exports.signUp = async(req, res) => {
    const { first_name, last_name, email, password } = req.body
    console.log(first_name)
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const file = '../default_images/blank-profile.png'
        const createUser = `INSERT INTO users (first_name,last_name,email,user_password,profile_image) values('${first_name}','${last_name}','${email}','${hashedPassword}','${file}')`
        await pool.query(createUser)
        res.status(203).json('user created')
    } catch (e) {
        if (e.constraint === 'users_email_key') {
            res.status(400).json({ error: 'email', details: 'this email already exists' })
        }
    }
}