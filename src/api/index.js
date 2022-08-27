import axios from "axios"; 

const APIConfig = axios.create({ 
    baseURL: "https://konnekin-backend.herokuapp.com/api/",  
}); 

export default APIConfig;