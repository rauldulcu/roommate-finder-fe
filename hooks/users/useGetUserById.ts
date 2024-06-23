import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/users/getUserById";

export const useGetUserById = (id: number) => {
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ["getUser", id],
    queryFn: () => getUserById(id),
    refetchOnWindowFocus: true,
  });

  return { user, userError, userLoading, refetch };
};
