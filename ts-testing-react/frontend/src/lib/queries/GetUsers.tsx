import { api } from "../axios";

export const GetUsers = async () => { 
    const { data } = await api.get(`/users`);
    return data;
};