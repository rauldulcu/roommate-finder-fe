import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostScreenValues } from "../../screens/CreatePostScreen/CreatePostScreen";
import { postApartment } from "../../services/apartments/postApartment";

export const useCreateApartment = () => {
  const queryClient = useQueryClient();
  const queryKeys = {
    queryKey: ["apartments"],
  };

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
      queryClient.invalidateQueries(queryKeys);
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
