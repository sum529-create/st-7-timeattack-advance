import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodo } from "../api/todos";

export const useFetchTodo = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodo,
  });
};

export const useAddTodo = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (todo) => addTodo(todo),
    onSuccess: () => {
      queryclient.invalidateQueries(["todos"]);
    },
  });
};
