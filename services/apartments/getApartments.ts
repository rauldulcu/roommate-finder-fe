import { ApartmentType } from "../../types/ApartmentType";
import HttpClient from "../httpClient";

export const getApartments = async () => {
  try {
    const response = await HttpClient.base.get<ApartmentType[]>("/apartments");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not get apartments");
  }

  throw new Error("The API returned an unexpected response");
};
