import { api } from "../axios";

export const CreatePost = async ({formData, token}) => {
    const { data } = await api.post("/create-post", formData, token);
    return data;
};  
