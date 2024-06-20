import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/users/getUserById";

export const useGetUserById = (id: number) => {
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUserById(id),
  });

  return { user, userError, userLoading };
};
