import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users/getUsers";

export const useGetUsers = () => {
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { users, usersError, usersLoading };
};
