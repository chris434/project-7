import Axios from 'axios'

export default Axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 3000
})