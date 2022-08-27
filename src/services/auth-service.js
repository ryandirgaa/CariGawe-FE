import axios from "axios";
const API_URL = "https://carigawe-be.herokuapp.com/api/v1/";

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "login", {username, password})
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(fullname, email, username, password, dateofbirth, description, photo) {    
        return axios.post(API_URL + "register", {
            fullname,
            email,
            username,
            password,
            dateofbirth,
            description,
            photo
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();