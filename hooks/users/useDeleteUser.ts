import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/users/deleteUser";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const {
    data: deletedUser,
    error: deleteUserError,
    mutate: deleteUserId,
  } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
  });

  return { deleteUserId, deletedUser, deleteUserError };
};
