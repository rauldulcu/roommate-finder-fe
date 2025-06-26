import { ApartmentType } from "../../types";
import HttpClient from "../httpClient";

export const getApartmentByOwnerId = async (
  ownerId: number
): Promise<ApartmentType | null> => {
  try {
    const response = await HttpClient.base.get<ApartmentType | null>(
      `/apartments/owner/${ownerId}`
    );
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 204) {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not get apartment");
  }

  throw new Error("The API returned an unexpected response");
};
