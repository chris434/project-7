import axios from './axios'
import Cookies from "universal-cookie"

const LoginFunction = (email, password) => {

    return axios.post('/backend/login', { email: email, password: password }).then(res => {
        console.log('jj')
        console.log(res)
        const cookie = new Cookies()
        cookie.set('Authorization', `bearer ${res.data.token}`)
    }).catch(Error => {
        return console.log(Error.response)

    })
}
export default LoginFunction