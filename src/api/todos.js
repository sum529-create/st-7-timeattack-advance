import axios from "axios";

export const todoApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchTodo = async () => {
  const response = await todoApi.get("/todos");
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await todoApi.post("/todos", todo);
  return response.data;
};
