import axios from './axios'
import Cookies from "universal-cookie"

const LoginFunction = async(email, password) => {
    try {
        const response = await axios.post('/backend/login', { email: email, password: password })
        const cookie = new Cookies()
        cookie.set('Authorization', `bearer ${response.data.token}`)
        return response
    } catch (e) {
        console.log(e)
    }
}
export default LoginFunction