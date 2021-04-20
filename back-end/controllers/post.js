const pool = require('../db/db.config')
const dateConverter = require('../utils/date-converter')



exports.getPosts = async(req, res) => {
    try {
        let posts = await pool.query("SELECT post_id, like_count,comment_count, posts.created_date, first_name, last_name,profile_image FROM posts JOIN users ON (posts.user_id = users.user_id) ORDER BY posts.created_date DESC")
        const postContent = await pool.query('SELECT post_id, content, content_type FROM post_content')
        const hasRead = await pool.query(`SELECT post_id FROM user_read WHERE user_id =${req.id}`)
        const hasLiked = await pool.query(`SELECT post_id FROM likes WHERE user_id =${req.id}`)

        const mappedPosts = posts.rows.map(row => {
            let read = false
            let liked = false
            let content = {}

            for (let i = 0; i < postContent.rows.length; i++) {
                const contentRow = postContent.rows[i]
                if (contentRow.post_id === row.post_id) {
                    content = {
                        ...content,
                        [contentRow.content_type]: contentRow.content
                    }
                }
            }

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
            return {...row, read, liked, ...content }

        })
        return res.status(200).json(mappedPosts)
    } catch (e) {
        console.log(e)
    }
}
exports.createPost = async(req, res) => {
    const content = req.file || req.body.value
    const contentType = req.body.field
    const userId = req.id
    try {

        const postId = await pool.query(`INSERT INTO posts (user_id) values(${userId}) RETURNING post_id`)
        await pool.query(`INSERT INTO post_content (content,content_type,post_id) VALUES('${content}','${contentType}',${postId.rows[0].post_id})`)
        return res.status(200).json('post successful')
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.getPost = async(req, res) => {
    try {
        const id = req.params.id
        const user_id = req.id

        const post = await pool.query(`SELECT post_id,like_count,comment_count, posts.created_date, first_name, last_name,profile_image  FROM posts JOIN users ON (posts.user_id = users.user_id) WHERE post_id = ${id}`)
        const likes = await pool.query(`SELECT like_id, first_name,last_name,profile_image FROM likes JOIN users ON (likes.user_id = users.user_id) WHERE post_id = ${id}`)
        const comments = await pool.query(`SELECT comment_id, first_name,last_name,profile_image,comment_content,comments.created_time FROM comments JOIN users ON (comments.user_id = users.user_id) WHERE post_id = ${id} ORDER BY comments.created_time DESC`)
        const postContent = await pool.query(`SELECT post_id, content, content_type FROM post_content WHERE post_id =${id}`)
        await pool.query(`INSERT INTO user_read (user_id,post_id) VALUES(${user_id},${id}) ON CONFLICT (post_id,user_id) DO NOTHING`)

        let content = {}

        for (let i = 0; i < postContent.rows.length; i++) {
            const row = postContent.rows[i]
            content = {...content, [row.content_type]: row.content }
        }

        for (let i = 0; i < comments.rows.length; i++) {
            comments.rows[i].created_time = dateConverter(comments.rows[i].created_time)
        }

        post.rows[0].created_date = dateConverter(post.rows[0].created_date)
        const data = {...post.rows[0], likes: likes.rows, comments: comments.rows, ...content }
        res.status(200).json(data)

    } catch (e) {
        res.status(401).json('unable to find post')
    }
}
exports.postLikes = async(req, res) => {
    try {
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
exports.postComment = async(req, res) => {
    const userId = req.id
    const comment = req.body.comment
    const postId = req.params.id
    try {
        const commentId = await pool.query(`INSERT INTO comments (comment_content,user_id,post_id) VALUES('${comment}',${userId},${postId}) RETURNING comment_id`)
        await pool.query(`UPDATE posts SET comment_count = (SELECT COUNT(comment_id + 1) FROM comments WHERE post_id =${postId}) WHERE post_id = ${postId}`)

        return res.status(200).json(commentId.rows[0].comment_id)

    } catch (error) {
        console.log(error)
        return res.status(400).json('fail to post comment')
    }
}
exports.deleteAccount = async(req, res) => {
    const user_id = req.id
    try {
        const posts = await pool.query(`SELECT post_id FROM posts WHERE user_id =${user_id}`)
        console.log(posts.rows)
            //deleting other users like/comments relating to this users posts
        for (let i = 0; i < posts.rows.length; i++) {
            await pool.query(`DELETE FROM likes WHERE post_id =${posts.rows[i].post_id}`)
            await pool.query(`DELETE FROM comments WHERE post_id =${posts.rows[i].post_id}`)
            await pool.query(`DELETE FROM user_read WHERE post_id =${posts.rows[i].post_id}`)
            await pool.query(`DELETE FROM post_content WHERE post_id =${posts.rows[i].post_id}`)
        }
        //deleting post content the current user has liked/commented
        await pool.query(`DELETE FROM likes WHERE user_id =${user_id}`)
        await pool.query(`DELETE FROM comments WHERE user_id =${user_id}`)
        await pool.query(`DELETE FROM user_read WHERE user_id =${user_id}`)
        await pool.query(`DELETE FROM posts WHERE user_id =${user_id}`)
        await pool.query(`DELETE FROM users WHERE user_id =${user_id}`)

        await pool.query(`UPDATE posts SET like_count = (SELECT COUNT(like_id) FROM likes WHERE likes.post_id = posts.post_id)`)
        await pool.query(`UPDATE posts SET comment_count = (SELECT COUNT(comment_id) FROM comments WHERE comments.post_id = posts.post_id)`)
        return res.status(200).json('account deleted')
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}