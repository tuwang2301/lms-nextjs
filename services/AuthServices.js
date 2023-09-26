// import axios from "axios";
import axios from "./customizeAxios";

const apiLogin = ({ username, password, client_token }) => {
    return axios.post('/auth/login', { username, password, client_token });
}

export { apiLogin }