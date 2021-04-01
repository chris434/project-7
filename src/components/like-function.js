import axios from './axios'
import Cookies from "universal-cookie"

const postLike = async(post_id) => {
    try {
        const cookie = new Cookies()
        console.log(cookie.get("Authorization"))
        const response = await axios.post(`/backend/like/${post_id}`, {
            headers: {
                Authorization: cookie.get("Authorization"),
            },
        })
        return response
    } catch (e) {
        console.log(e)
    }
}

export default postLike