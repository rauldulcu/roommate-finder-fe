import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApartment } from "../../services/apartments/deleteApartment";
import { useUser } from "../../context/UserContext/UserContext";

export const useDeleteApartment = () => {
  const queryClient = useQueryClient();
  const { loggedUser } = useUser();
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
      queryClient.invalidateQueries({
        queryKey: ["getApartmentByOwner", loggedUser?.id],
      });
    },
  });

  return { deleteApartmentId, deletedApartment, deleteApartmentError };
};
