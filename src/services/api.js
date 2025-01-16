import axios from "axios";

// Configuration of axios
const api = axios.create({
    baseURL: "http://content-service:8080", // Content service URL
});

export default api;



