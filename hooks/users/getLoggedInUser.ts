import HttpClient from "../../services/httpClient";
import { UserType } from "../../types";

export const getLoggedInUser = async () => {
  try {
    const response = await HttpClient.base.get<UserType>(`/users/loggedInUser`);
    if (response.status === 200) return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log("Response error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.log("Request error:", error.request);
    } else {
      // Something else happened
      console.log("Error", error.message);
    }
  }
};
