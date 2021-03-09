import { axios } from './axios'

const LoginFunction = async(email, password) => {
    try {
        const response = await axios.post('/backend/login', { email: email, password: password })
        console.log(response)
        const header = new Headers()
        header.append('Authorization', `Bearer ${response.data.token}`)
        return response
    } catch (e) {
        console.log(e)
    }
}
export default LoginFunction