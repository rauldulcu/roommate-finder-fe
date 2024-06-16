import { LocationType } from "../../types/LocationType";
import HttpClient from "../httpClient";

export const postLocation = async (location: LocationType) => {
  try {
    const response = await HttpClient.base.post<LocationType>(
      "/locations",
      location
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not create location");
  }

  throw new Error("The API returned an unexpected response");
};
