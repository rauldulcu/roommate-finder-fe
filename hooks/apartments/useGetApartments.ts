import { useQuery } from "@tanstack/react-query";
import { getApartments } from "../../services/apartments/getApartments";

export const useGetApartments = () => {
  const {
    data: apartments,
    error: apartmentsError,
    isLoading: apartmentsLoading,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: getApartments,
    retry: true,
  });

  return { apartments, apartmentsError, apartmentsLoading };
};
