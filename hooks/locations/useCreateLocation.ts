import { useMutation } from "@tanstack/react-query";
import { LocationType } from "../../types/LocationType";
import { postLocation } from "../../services/locations/postLocation";

export const useCreateLocation = () => {
  const {
    data: createdLocation,
    error: createLocationError,
    isSuccess: createLocationSuccess,
    mutate: createLocation,
  } = useMutation({
    mutationKey: ["createLocation"],
    mutationFn: (location: LocationType) => postLocation(location),
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
