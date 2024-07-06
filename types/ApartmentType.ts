import { LocationType } from "./LocationType";
import { UserType } from "./UserType";

type ImageType = {
  id: number;
  imageURL: string;
};

export type ApartmentType = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  owner: UserType;
  utilities: string[];
  location: LocationType;
  imageURLs: ImageType[];
};
