import { api } from "../axios";

export const GetPosts = async () => {
    const { data } = await api.get("/get-posts");
    return data;
};