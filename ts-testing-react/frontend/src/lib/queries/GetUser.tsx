import { api } from "../axios";

export type SpecUser = {
    firstName: string;
    email: string;
    lastName: string;
};


export const GetUser = async (id:unknown) => { 
    const { data } = await api.get(`/users/${id}`);
    return data;
};