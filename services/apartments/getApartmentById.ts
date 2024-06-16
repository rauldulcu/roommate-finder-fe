import { ApartmentType } from "../../types/ApartmentType";
import HttpClient from "../httpClient";

export const getApartmentById = async (id: number) => {
  try {
    const response = await HttpClient.base.get<ApartmentType>(
      `/apartments/${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not get apartment");
  }

  throw new Error("The API returned an unexpected response");
};
