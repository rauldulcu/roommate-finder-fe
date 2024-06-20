import { ApartmentType } from "../../types/ApartmentType";
import HttpClient from "../httpClient";

export const getUserSavedApartments = async (userId: number) => {
  try {
    const response = await HttpClient.base.get<ApartmentType[]>(
      `/userSavedApartments/user/${userId}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not get user saved apartments");
  }

  throw new Error("The API returned an unexpected response");
};
