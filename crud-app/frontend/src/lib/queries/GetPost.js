import { api } from "../axios";

export const GetPost = async (id) => {
  const data = await api.get(`/get-post/${id}`);
  return data;
}