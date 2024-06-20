import HttpClient from "../httpClient";

export const postUserSavedApartment = async (
  userId: number,
  apartmentId: number
) => {
  try {
    const response = await HttpClient.base.post(
      `/userSavedApartments/toggleSave/${userId}/${apartmentId}`
    );
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not save apartment");
  }

  throw new Error("The API returned an unexpected response");
};
