import HttpClient from "../httpClient";

export const logoutUser = async () => {
  try {
    await HttpClient.base.post("/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
