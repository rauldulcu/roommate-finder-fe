import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editApartment } from "../../services/apartments/editApartment";
import { ApartmentType } from "../../types/ApartmentType";
import { EditApartmentScreenValues } from "../../screens/EditApartmentScreen/EditApartmentScreen";

export const useUpdateApartment = () => {
  const queryClient = useQueryClient();

  const {
    data: updatedApartment,
    error: updateApartmentError,
    mutate: updateApartment,
    isPending: updateApartmentPending,
  } = useMutation({
    mutationKey: ["updateApartment"],
    mutationFn: ({
      id,
      apartment,
    }: {
      id: number;
      apartment: EditApartmentScreenValues;
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

  return {
    updateApartment,
    updatedApartment,
    updateApartmentError,
    updateApartmentPending,
  };
};
