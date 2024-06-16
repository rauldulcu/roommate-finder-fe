import React, { createContext, useContext, useState, ReactNode } from "react";
import { FilterType } from "../../components/FiltersComponent/FiltersType";

interface FiltersContextType {
  filters: FilterType;
  updateFilters: (newFilters: FilterType) => void;
  clearFilters: () => void;
}

const defaultFilters: FilterType = {
  zoneFilters: [],
  utilityFilters: [],
  priceFilters: [],
  genderFilters: [],
  ageFilters: [],
  hobbyFilters: [],
};

const FiltersContext = createContext<FiltersContextType>({
  filters: defaultFilters,
  updateFilters: () => {},
  clearFilters: () => {},
});

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterType>(defaultFilters);

  const updateFilters = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FiltersContext.Provider value={{ filters, updateFilters, clearFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
