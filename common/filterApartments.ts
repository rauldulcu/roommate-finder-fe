import { FilterType } from "../components/FiltersComponent/FiltersType";
import { ApartmentType } from "../types";
import { calculateYearsFromTimestamp } from "./calculateYears";

export const filterApartments = (
  apartments: ApartmentType[],
  filters: FilterType
) => {
  const parseFilters = (range: string) => {
    if (range.includes("+")) {
      const min = Number(range.replace("+", ""));
      return { min, max: 5000 };
    }
    const [min, max] = range.split("-").map(Number);
    return { min, max };
  };

  return apartments.filter((apartment) => {
    return (
      (!filters.zoneFilters.length ||
        filters.zoneFilters.includes(apartment.location.zone)) &&
      (!filters.utilityFilters.length ||
        filters.utilityFilters.every((utility) =>
          apartment.utilities.includes(utility)
        )) &&
      (!filters.priceFilters.length ||
        filters.priceFilters.some((priceRange) => {
          const { min, max } = parseFilters(priceRange);
          return apartment.price >= min && apartment.price <= max;
        })) &&
      (!filters.ageFilters.length ||
        filters.ageFilters.some((ageRange) => {
          const { min, max } = parseFilters(ageRange);
          return (
            calculateYearsFromTimestamp(apartment.owner.dateOfBirth) >= min &&
            calculateYearsFromTimestamp(apartment.owner.dateOfBirth) <= max
          );
        })) &&
      (!filters.genderFilters.length ||
        filters.genderFilters.includes(apartment.owner.gender)) &&
      (!filters.hobbyFilters.length ||
        filters.hobbyFilters.some((hobby) =>
          apartment.owner.hobbies.includes(hobby)
        ))
    );
  });
};
