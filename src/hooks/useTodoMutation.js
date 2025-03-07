import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoLike } from "../api/todos";

export const useTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, currentLiked }) => todoLike(id, currentLiked),
    onMutate: async ({ id, currentLiked }) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData(["todos"]) || [];

      queryClient.setQueryData(["todos"], (oldValue) => {
        return oldValue.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                isLiked: !currentLiked,
              }
            : todo
        );
      });

      return { previousTodos };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
