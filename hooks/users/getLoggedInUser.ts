import HttpClient from "../../services/httpClient";
import { UserType } from "../../types";

export const getLoggedInUser = async () => {
  try {
    const response = await HttpClient.base.get<UserType>(`/users/loggedInUser`);
    if (response.status === 200) return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Response error:", error.response.data);
    } else if (error.request) {
      console.log("Request error:", error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
