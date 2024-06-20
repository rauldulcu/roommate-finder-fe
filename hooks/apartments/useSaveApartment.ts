import { useMutation } from "@tanstack/react-query";
import { postUserSavedApartment } from "../../services/userSavedApartments/postUserSavedApartment";

export const useSaveApartment = (userId: number, apartmentId: number) => {
  const {
    data: savedApartment,
    error: savedApartmentError,
    isSuccess: savedApartmentSuccess,
    mutate: saveApartment,
  } = useMutation({
    mutationKey: ["saveApartment"],
    mutationFn: () => postUserSavedApartment(userId, apartmentId),
    onSuccess: (data) => {
      console.log("Saved apartment successfully", data);
    },
    onError: (error) => {
      console.error("Failed to save apartment", error);
    },
  });

  return {
    saveApartment,
    savedApartment,
    savedApartmentError,
    savedApartmentSuccess,
  };
};
