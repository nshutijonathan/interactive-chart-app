import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchUsers = () => apiClient.get("/users");
export const fetchComments = () => apiClient.get("/comments");
export const fetchAlbums = () => apiClient.get("/albums");
export const fetchPosts = () => apiClient.get("/posts");
