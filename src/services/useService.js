import api from "./api";

export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const getUserProfiles = async (userId) => {
    const response = await api.get(`/users/${userId}/profiles`);
    return response.data;
};
