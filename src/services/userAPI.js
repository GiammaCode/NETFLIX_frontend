import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:8081", // Modifica l'URL in base al tuo backend
});

export default userApi;