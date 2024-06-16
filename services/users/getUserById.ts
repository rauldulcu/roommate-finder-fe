import { UserType } from "../../types/UserType";
import HttpClient from "../httpClient";

export const getUserById = async (id: number) => {
  try {
    const response = await HttpClient.base.get<UserType>(`/users/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not get user");
  }

  throw new Error("The API returned an unexpected response");
};
