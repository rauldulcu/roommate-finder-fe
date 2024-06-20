import { useQuery } from "@tanstack/react-query";
import { getIsApartmentSaved } from "../../services/userSavedApartments/getIsApartmentSavedByUser";

export const useIsApartmentSaved = (userId: number, apartmentId: number) => {
  const {
    data: isApartmentSaved,
    error: isApartmentSavedError,
    isLoading: isApartmentSavedLoading,
  } = useQuery({
    queryKey: ["getIsSaved", userId, apartmentId],
    queryFn: () => getIsApartmentSaved(userId, apartmentId),
  });

  return {
    isApartmentSaved,
    isApartmentSavedError,
    isApartmentSavedLoading,
  };
};
