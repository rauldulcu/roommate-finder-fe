import HttpClient from "../httpClient";

export const deleteApartment = async (id: number) => {
  try {
    const response = await HttpClient.base.delete(`/apartments/${id}`);
    if (response.status === 204) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not delete apartment");
  }

  throw new Error("The API returned an unexpected response");
};
