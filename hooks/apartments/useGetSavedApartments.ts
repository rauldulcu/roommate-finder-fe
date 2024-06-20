import { useQuery } from "@tanstack/react-query";
import { getUserSavedApartments } from "../../services/userSavedApartments/getUserSavedApartments";

export const useGetSavedApartments = (userId: number) => {
  const {
    data: userSavedApartments,
    error: userSavedApartmentsError,
    isLoading: userSavedApartmentsLoading,
  } = useQuery({
    queryKey: ["getSavedApartments", userId],
    queryFn: () => getUserSavedApartments(userId),
  });

  return {
    userSavedApartments,
    userSavedApartmentsError,
    userSavedApartmentsLoading,
  };
};
