import axios from "axios";

const viewAPI = axios.create({
    baseURL: "http://view-service:8082", // View service URL
});

export default viewAPI;