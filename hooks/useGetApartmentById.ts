import { useQuery } from "@tanstack/react-query";
import { getApartmentById } from "../services/apartments/getApartmentById";

export const useGetApartmentById = (id: number) => {
  const {
    data: apartment,
    error: apartmentError,
    isLoading: apartmentLoading,
  } = useQuery({
    queryKey: ["apartments", id],
    queryFn: () => getApartmentById(id),
  });

  return { apartment, apartmentError, apartmentLoading };
};
