import axios from "axios"; 

const APIConfig = axios.create({ 
    baseURL: "https://carigawe-be.herokuapp.com/",  
}); 

export default APIConfig;
