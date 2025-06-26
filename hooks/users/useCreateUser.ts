import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType } from "../../types";
import { postUser } from "../../services/users/postUser";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const {
    data: createdUser,
    error: createUserError,
    mutate: createUser,
    isPending: createUserPending,
  } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (user: UserType) => postUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (error) => {
      console.error("Failed to create user", error);
    },
  });

  return { createUser, createdUser, createUserError, createUserPending };
};
