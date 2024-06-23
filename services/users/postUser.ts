import { UserType } from "../../types/UserType";
import HttpClient from "../httpClient";

export const postUser = async (user: UserType) => {
  try {
    const response = await HttpClient.base.post<UserType>("/users", user);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not create user");
  }

  throw new Error("The API returned an unexpected response");
};
