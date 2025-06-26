import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/users/deleteUser";
import { useUser } from "../../context/UserContext/UserContext";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { handleLogout } = useUser();

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
      handleLogout();
    },
  });

  return { deleteUserId, deletedUser, deleteUserError };
};
