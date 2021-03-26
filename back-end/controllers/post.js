const pool = require('../db/db.config')
const dateConverter = require('../utils/date-converter')


exports.getPosts = async(req, res) => {
    try {
        let posts = await pool.query("SELECT post_id, post_content, posts.created_date, first_name, last_name,profile_image FROM posts JOIN users ON (posts.user_id = users.user_id) ORDER BY posts.created_date DESC")
        const hasRead = await pool.query(`SELECT post_id FROM user_read WHERE user_id =${req.id}`)

        const mappedPosts = posts.rows.map(row => {
            let read
            if (hasRead.rowCount === 0) {
                read = 'unread'
            }
            console.log(dateConverter(row.created_date))
            row.created_date = dateConverter(row.created_date)
            return {...row, read: read }

        })
        console.log('jj')
        return res.status(200).json(mappedPosts)
    } catch (e) {
        console.log(e)
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

exports.getPost = async(req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const post = await pool.query(`SELECT post_id, post_content, posts.created_date, first_name, last_name,profile_image  FROM posts JOIN users ON (posts.user_id = users.user_id) WHERE post_id = ${id}`)
        console.log(post.rows[0].created_date)
        post.rows[0].created_date = dateConverter(post.rows[0].created_date)
        res.json(post.rows[0])

    } catch (e) {
        console.log(e)
    }
}