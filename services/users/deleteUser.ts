import HttpClient from "../httpClient";

export const deleteUser = async (id: number) => {
  try {
    const response = await HttpClient.base.delete(`/users/${id}`);
    if (response.status === 204) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not delete user");
  }

  throw new Error("The API returned an unexpected response");
};
