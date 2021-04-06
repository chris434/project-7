const pool = require('../db/db.config')
const dateConverter = require('../utils/date-converter')


exports.getPosts = async(req, res) => {
    try {
        let posts = await pool.query("SELECT post_id, post_content,image_url,like_count,comment_count, posts.created_date, first_name, last_name,profile_image FROM posts JOIN users ON (posts.user_id = users.user_id) ORDER BY posts.created_date DESC")
        const hasRead = await pool.query(`SELECT post_id FROM user_read WHERE user_id =${req.id}`)
        const hasLiked = await pool.query(`SELECT post_id FROM likes WHERE user_id =${req.id}`)

        const mappedPosts = posts.rows.map(row => {
            let read = false
            let liked = false

            hasRead.rows.forEach(readRow => {
                if (row.post_id === readRow.post_id) {
                    return read = true
                }
            })
            hasLiked.rows.forEach(likedRow => {
                if (row.post_id === likedRow.post_id) {
                    return liked = true
                }
            })

            console.log(dateConverter(row.created_date))
            row.created_date = dateConverter(row.created_date)
            return {...row, read, liked }

        })
        console.log('jj')
        return res.status(200).json(mappedPosts)
    } catch (e) {
        console.log(e)
    }
}
exports.createPost = async(req, res) => {
    const content = req.file || req.body.value
    const field = req.body.field
    const userId = req.id
    try {

        await pool.query(`INSERT INTO posts (${field},user_id) values('${content}',${userId})`)
        return res.status(200).json('post successful')

    } catch (e) {
        res.status(400).json(e)
    }
}

exports.getPost = async(req, res) => {
    try {
        const id = req.params.id
        const user_id = req.id
        console.log(id)
        const post = await pool.query(`SELECT post_id, post_content,image_url,like_count,comment_count, posts.created_date, first_name, last_name,profile_image  FROM posts JOIN users ON (posts.user_id = users.user_id) WHERE post_id = ${id}`)
        const likes = await pool.query(`SELECT first_name,last_name,profile_image FROM likes JOIN users ON (likes.user_id = users.user_id) WHERE post_id = ${id}`)
        await pool.query(`INSERT INTO user_read (user_id,post_id) VALUES(${user_id},${id}) ON CONFLICT (post_id,user_id) DO NOTHING`)
        console.log(post.rows[0].created_date)
        post.rows[0].created_date = dateConverter(post.rows[0].created_date)
        const data = {...post.rows[0], likes: likes.rows }
        res.status(200).json(data)

    } catch (e) {
        console.log(e)
    }
}
exports.postLikes = async(req, res) => {
    try {
        console.log(req.params)
        const query = await pool.query(`INSERT INTO likes (post_id , user_id) values(${req.params.id},${req.id}) ON CONFLICT (post_id,user_id) DO NOTHING`)

        await pool.query(`UPDATE posts SET like_count = (SELECT COUNT(like_id + 1) FROM likes WHERE post_id =${req.params.id}) WHERE post_id = ${req.params.id}`)

        if (query.rowCount === 0) {
            await pool.query(`DELETE FROM likes WHERE post_id = ${req.params.id} AND user_id = ${req.id}`)
            await pool.query(`UPDATE posts SET like_count = (SELECT COUNT(like_id + -1) FROM likes WHERE post_id =${req.params.id}) WHERE post_id = ${req.params.id}`)
            return res.status(202).json({ message: 'like removed', count: -1 })
        }

        res.status(202).json({ message: 'like added', count: 1 })
    } catch (e) {
        console.log(e)
    }

}