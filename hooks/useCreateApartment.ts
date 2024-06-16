import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApartment } from "../services/apartments/postApartment";
import { CreatePostScreenValues } from "../screens/CreatePostScreen/CreatePostScreen";

export const useCreateApartment = () => {
  const queryClient = useQueryClient();
  const apartmentQueryKey = ["apartments"];

  const {
    data: createdApartment,
    error: createApartmentError,
    isSuccess: createApartmentSuccess,
    mutate: createApartment,
  } = useMutation({
    mutationKey: ["createApartment"],
    mutationFn: (apartment: CreatePostScreenValues) => postApartment(apartment),
    onSuccess: (data) => {
      console.log("Apartment created successfully", data);
      queryClient.invalidateQueries(apartmentQueryKey);
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
  };
};
