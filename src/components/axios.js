import Axios from 'axios'
import Cookies from "universal-cookie";
const cookie = new Cookies();
export default Axios.create({
    baseURL: 'http://localhost:5000',
})