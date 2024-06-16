import { UserType } from "../../types/UserType";
import HttpClient from "../httpClient";

export const getUsers = async () => {
  try {
    const response = await HttpClient.base.get<UserType[]>("/users");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not get users");
  }

  throw new Error("The API returned an unexpected response");
};
