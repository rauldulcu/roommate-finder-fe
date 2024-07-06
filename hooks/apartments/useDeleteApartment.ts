import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApartmentById } from "../../services/apartments/getApartmentById";
import { deleteApartment } from "../../services/apartments/deleteApartment";

export const useDeleteApartment = () => {
  const queryClient = useQueryClient();

  const {
    data: deletedApartment,
    error: deleteApartmentError,
    mutate: deleteApartmentId,
  } = useMutation({
    mutationKey: ["deleteApartment"],
    mutationFn: (id: number) => deleteApartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["getApartment"] });
    },
  });

  return { deleteApartmentId, deletedApartment, deleteApartmentError };
};
