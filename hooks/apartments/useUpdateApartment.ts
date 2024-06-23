import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editApartment } from "../../services/apartments/editApartment";
import { ApartmentType } from "../../types/ApartmentType";

export const useUpdateApartment = () => {
  const queryClient = useQueryClient();

  const {
    data: updatedApartment,
    error: updateApartmentError,
    mutate: updateApartment,
  } = useMutation({
    mutationKey: ["updateApartment"],
    mutationFn: ({
      id,
      apartment,
    }: {
      id: number;
      apartment: Omit<ApartmentType, "id">;
    }) => editApartment(apartment, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
      queryClient.invalidateQueries({ queryKey: ["getApartment"] });
    },
    onError: (error) => {
      console.error("Failed to update apartment", error);
    },
  });

  return { updateApartment, updatedApartment, updateApartmentError };
};
