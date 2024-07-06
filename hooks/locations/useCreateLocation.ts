import { useMutation } from "@tanstack/react-query";
import { postLocation } from "../../services/locations/postLocation";
import { LocationType } from "../../types";

export const useCreateLocation = () => {
  const {
    data: createdLocation,
    error: createLocationError,
    isSuccess: createLocationSuccess,
    mutate: createLocation,
  } = useMutation({
    mutationKey: ["createLocation"],
    mutationFn: (location: Omit<LocationType, "id">) => postLocation(location),
    onError: (error) => {
      console.error("Failed to create location", error);
    },
  });

  return {
    createLocation,
    createdLocation,
    createLocationError,
    createLocationSuccess,
  };
};
