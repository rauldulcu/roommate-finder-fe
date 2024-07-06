import { EditApartmentScreenValues } from "../../screens/EditApartmentScreen/EditApartmentScreen";
import { ApartmentType } from "../../types";
import HttpClient from "../httpClient";

export const editApartment = async (
  apartment: EditApartmentScreenValues,
  id: number
) => {
  try {
    const response = await HttpClient.base.put<ApartmentType>(
      `/apartments/${id}`,
      apartment
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not update apartment");
  }

  throw new Error("The API returned an unexpected response");
};
