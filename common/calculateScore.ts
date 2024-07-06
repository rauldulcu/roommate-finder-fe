import { ApartmentType } from "../types/ApartmentType";
import { UserType } from "../types/UserType";

export function calculateScore(user: UserType, apartment: ApartmentType) {
  const userHobbies = new Set(user.hobbies);
  const ownerHobbies = new Set(apartment.owner.hobbies);
  let score = 0;

  ownerHobbies.forEach((hobby) => {
    if (userHobbies.has(hobby)) {
      score += 1;
    }
  });
  return score;
}

export function sortApartments(user: UserType, apartments: ApartmentType[]) {
  return apartments.sort((a, b) => {
    return calculateScore(user, b) - calculateScore(user, a);
  });
}
