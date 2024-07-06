import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType } from "../../types/UserType";
import { editUser } from "../../services/users/editUser";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const {
    data: updatedUser,
    error: updateUserError,
    mutate: updateUser,
    isPending: updateUserPending,
  } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: ({ id, user }: { id: number; user: UserType }) =>
      editUser(user, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to update user", error);
    },
  });

  return { updateUser, updatedUser, updateUserError, updateUserPending };
};
