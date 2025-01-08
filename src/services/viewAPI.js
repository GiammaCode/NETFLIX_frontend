import axios from "axios";

const viewApi = axios.create({
    baseURL: "http://localhost:8082", // View service URL
});

export default viewApi;