import { useQuery } from "@tanstack/react-query";
import { getApartmentByOwnerId } from "../../services/apartments/getApartmentByOwnerId";

export const useGetApartmentByOwnerId = (ownerId: number) => {
  const {
    data: apartment,
    error: apartmentError,
    isLoading: apartmentLoading,
    refetch,
  } = useQuery({
    queryKey: ["getApartmentByOwner", ownerId],
    queryFn: () => getApartmentByOwnerId(ownerId),
  });

  return { apartment, apartmentError, apartmentLoading, refetch };
};
