import { CreatePostScreenValues } from "../../screens/CreatePostScreen/CreatePostScreen";
import HttpClient from "../httpClient";

export const postApartment = async (apartment: CreatePostScreenValues) => {
  try {
    const response = await HttpClient.base.post<CreatePostScreenValues>(
      "/apartments",
      apartment
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Could not create apartment");
  }

  throw new Error("The API returned an unexpected response");
};
