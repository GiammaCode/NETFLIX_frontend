import axios from "axios";

const userApi = axios.create({
    baseURL: "http://172.171.150.175:8081", // User service URL
});

export default userApi;