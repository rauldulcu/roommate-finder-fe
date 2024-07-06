import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostScreenValues } from "../../screens/CreatePostScreen/CreatePostScreen";
import { postApartment } from "../../services/apartments/postApartment";

export const useCreateApartment = () => {
  const queryClient = useQueryClient();

  const {
    data: createdApartment,
    error: createApartmentError,
    isSuccess: createApartmentSuccess,
    mutate: createApartment,
    isPending: createApartmentPending,
  } = useMutation({
    mutationKey: ["createApartment"],
    mutationFn: (apartment: CreatePostScreenValues) => postApartment(apartment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["getApartment"] });
    },
    onError: (error) => {
      console.error("Failed to create Apartment", error);
    },
  });

  return {
    createApartment,
    createdApartment,
    createApartmentError,
    createApartmentSuccess,
    createApartmentPending,
  };
};
