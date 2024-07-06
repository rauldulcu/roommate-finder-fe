import HttpClient from "../httpClient";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await HttpClient.base.post(
      "/login",
      new URLSearchParams({
        username,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.log("Response error:", error.response.data);
    } else if (error.request) {
      console.log("Request error:", error.request);
    } else {
      console.log("Error", error.message);
    }
  }

  throw new Error("Wrong credentials");
};
