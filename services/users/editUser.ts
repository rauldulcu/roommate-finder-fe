import { UserType } from "../../types/UserType";
import HttpClient from "../httpClient";

export const editUser = async (user: UserType, id: number) => {
  try {
    const response = await HttpClient.base.put<UserType>(`/users/${id}`, user);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not update user");
  }

  throw new Error("The API returned an unexpected response");
};
