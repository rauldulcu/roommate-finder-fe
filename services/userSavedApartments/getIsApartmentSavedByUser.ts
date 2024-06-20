import HttpClient from "../httpClient";

export const getIsApartmentSaved = async (
  userId: number,
  apartmentId: number
) => {
  try {
    const response = await HttpClient.base.get<boolean>(
      `/userSavedApartments/isSaved/${userId}/${apartmentId}`
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
