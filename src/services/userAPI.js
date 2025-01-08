import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:8081", // User service URL
});

export default userApi;