import { LocationType } from "./LocationType";
import { UserType } from "./UserType";

export type ApartmentType = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  owner: UserType;
  utilities: string[];
  location: LocationType;
};
