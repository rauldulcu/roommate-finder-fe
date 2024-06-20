import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import FilterTag from "../FilterTag";
import PrimaryButton from "../PrimaryButton";
import { Divider } from "@rneui/base";
import { FilterType } from "./FiltersType";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";
import { useFilters } from "../../context/FiltersContext/FitlersContext";

const screenWidth = Dimensions.get("window").width;

const FiltersComponent: React.FC = () => {
  const { filters, updateFilters, clearFilters } = useFilters();
  const [localFilters, setLocalFilters] = useState(filters);

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleLocalFilterSelect = (
    filterType: keyof FilterType,
    value: string
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const applyFiltersAndNavigate = () => {
    updateFilters(localFilters);
    console.log(filters);
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Zone</Text>
      <View style={styles.section}>
        <View style={styles.tagContainer}>
          <FilterTag
            value="MANASTUR"
            label="Mănăștur"
            icon="map"
            selected={localFilters.zoneFilters.includes("MANASTUR")}
            onSelect={() => handleLocalFilterSelect("zoneFilters", "MANASTUR")}
          />
          <FilterTag
            value="GRIGORESCU"
            label="Grigorescu"
            icon="map"
            selected={localFilters.zoneFilters.includes("GRIGORESCU")}
            onSelect={() =>
              handleLocalFilterSelect("zoneFilters", "GRIGORESCU")
            }
          />
          <FilterTag
            value="MARASTI"
            label="Mărăști"
            icon="map"
            selected={localFilters.zoneFilters.includes("MARASTI")}
            onSelect={() => handleLocalFilterSelect("zoneFilters", "MARASTI")}
          />
          <FilterTag
            value="ZORILOR"
            label="Zorilor"
            icon="map"
            selected={localFilters.zoneFilters.includes("ZORILOR")}
            onSelect={() => handleLocalFilterSelect("zoneFilters", "ZORILOR")}
          />
        </View>
      </View>

      <Text style={styles.header}>Utilities</Text>
      <View style={styles.section}>
        <View style={styles.tagContainer}>
          <FilterTag
            value="SMARTTV"
            label="Smart TV"
            icon="tv"
            selected={localFilters.utilityFilters.includes("SMARTTV")}
            onSelect={() =>
              handleLocalFilterSelect("utilityFilters", "SMARTTV")
            }
          />
          <FilterTag
            value="WIFI"
            label="WiFi"
            icon="wifi"
            selected={localFilters.utilityFilters.includes("WIFI")}
            onSelect={() => handleLocalFilterSelect("utilityFilters", "WIFI")}
          />
          <FilterTag
            value="PETFRIENDLY"
            label="Pet Friendly"
            icon="pets"
            selected={localFilters.utilityFilters.includes("PETFRIENDLY")}
            onSelect={() =>
              handleLocalFilterSelect("utilityFilters", "PETFRIENDLY")
            }
          />
          <FilterTag
            value="AIRCONDITIONED"
            label="Air Conditioned"
            icon="ac-unit"
            selected={localFilters.utilityFilters.includes("AIRCONDITIONED")}
            onSelect={() =>
              handleLocalFilterSelect("utilityFilters", "AIRCONDITIONED")
            }
          />
          <FilterTag
            value="DISHWASHER"
            label="Dishwasher"
            icon="local-laundry-service"
            selected={localFilters.utilityFilters.includes("DISHWASHER")}
            onSelect={() =>
              handleLocalFilterSelect("utilityFilters", "DISHWASHER")
            }
          />
          <FilterTag
            value="MICROWAVE"
            label="Microwave"
            icon="microwave"
            selected={localFilters.utilityFilters.includes("MICROWAVE")}
            onSelect={() =>
              handleLocalFilterSelect("utilityFilters", "MICROWAVE")
            }
          />
        </View>
      </View>

      <Text style={styles.header}>Sharing price (per month)</Text>
      <View style={styles.section}>
        <View style={styles.tagContainer}>
          <FilterTag
            value="50-100"
            label="50-100"
            icon="euro-symbol"
            selected={localFilters.priceFilters.includes("50-100")}
            onSelect={() => handleLocalFilterSelect("priceFilters", "50-100")}
          />
          <FilterTag
            value="100-150"
            label="100-150"
            icon="euro-symbol"
            selected={localFilters.priceFilters.includes("100-150")}
            onSelect={() => handleLocalFilterSelect("priceFilters", "100-150")}
          />
          <FilterTag
            value="150-200"
            label="150-200"
            icon="euro-symbol"
            selected={localFilters.priceFilters.includes("150-200")}
            onSelect={() => handleLocalFilterSelect("priceFilters", "150-200")}
          />
          <FilterTag
            value="200-250"
            label="200-250"
            icon="euro-symbol"
            selected={localFilters.priceFilters.includes("200-250")}
            onSelect={() => handleLocalFilterSelect("priceFilters", "200-250")}
          />
          <FilterTag
            value="250+"
            label="250+"
            icon="euro-symbol"
            selected={localFilters.priceFilters.includes("250+")}
            onSelect={() => handleLocalFilterSelect("priceFilters", "250+")}
          />
        </View>
      </View>

      <Text style={styles.header}>Gender of your roommate</Text>
      <View style={styles.section}>
        <View style={styles.tagContainer}>
          <FilterTag
            value="FEMALE"
            label="Female"
            icon="woman"
            selected={localFilters.genderFilters.includes("FEMALE")}
            onSelect={() => handleLocalFilterSelect("genderFilters", "FEMALE")}
          />
          <FilterTag
            value="MALE"
            label="Male"
            icon="man"
            selected={localFilters.genderFilters.includes("MALE")}
            onSelect={() => handleLocalFilterSelect("genderFilters", "MALE")}
          />
        </View>
      </View>

      <Text style={styles.header}>Age group of your roommate</Text>
      <View style={styles.section}>
        <View style={styles.tagContainer}>
          <FilterTag
            value="18-20"
            label="18-20"
            icon="cake"
            selected={localFilters.ageFilters.includes("18-20")}
            onSelect={() => handleLocalFilterSelect("ageFilters", "18-20")}
          />
          <FilterTag
            value="20-25"
            label="20-25"
            icon="cake"
            selected={localFilters.ageFilters.includes("20-25")}
            onSelect={() => handleLocalFilterSelect("ageFilters", "20-25")}
          />
          <FilterTag
            value="25-30"
            label="25-30"
            icon="cake"
            selected={localFilters.ageFilters.includes("25-30")}
            onSelect={() => handleLocalFilterSelect("ageFilters", "25-30")}
          />
          <FilterTag
            value="30-35"
            label="30-35"
            icon="cake"
            selected={localFilters.ageFilters.includes("30-35")}
            onSelect={() => handleLocalFilterSelect("ageFilters", "30-35")}
          />
          <FilterTag
            value="35-40"
            label="35-40"
            icon="cake"
            selected={localFilters.ageFilters.includes("35-40")}
            onSelect={() => handleLocalFilterSelect("ageFilters", "35-40")}
          />
        </View>
      </View>

      <Text style={styles.header}>Interests and hobbies of your roommate</Text>
      <View style={styles.section}>
        <View style={styles.tagContainer}>
          <FilterTag
            value="SPORTS"
            label="Sports"
            icon="sports-soccer"
            selected={localFilters.hobbyFilters.includes("SPORTS")}
            onSelect={() => handleLocalFilterSelect("hobbyFilters", "SPORTS")}
          />
          <FilterTag
            value="GAMING"
            label="Gaming"
            icon="sports-esports"
            selected={localFilters.hobbyFilters.includes("GAMING")}
            onSelect={() => handleLocalFilterSelect("hobbyFilters", "GAMING")}
          />
          <FilterTag
            value="READING"
            label="Reading"
            icon="book"
            selected={localFilters.hobbyFilters.includes("READING")}
            onSelect={() => handleLocalFilterSelect("hobbyFilters", "READING")}
          />
          <FilterTag
            value="COOKING"
            label="Cooking"
            icon="lunch-dining"
            selected={localFilters.hobbyFilters.includes("COOKING")}
            onSelect={() => handleLocalFilterSelect("hobbyFilters", "COOKING")}
          />
          <FilterTag
            value="GOINGOUT"
            label="Going Out"
            icon="nightlife"
            selected={localFilters.hobbyFilters.includes("GOINGOUT")}
            onSelect={() => handleLocalFilterSelect("hobbyFilters", "GOINGOUT")}
          />
          <FilterTag
            value="MUSIC"
            label="Music"
            icon="piano"
            selected={localFilters.hobbyFilters.includes("MUSIC")}
            onSelect={() => handleLocalFilterSelect("hobbyFilters", "MUSIC")}
          />
          <FilterTag
            value="PAINTING"
            label="Painting"
            icon="palette"
            selected={localFilters.hobbyFilters.includes("PAINTING")}
            onSelect={() => handleLocalFilterSelect("hobbyFilters", "PAINTING")}
          />
          <FilterTag
            value="TELEVISION"
            label="Movies / TV Shows"
            icon="movie"
            selected={localFilters.hobbyFilters.includes("TELEVISION")}
            onSelect={() =>
              handleLocalFilterSelect("hobbyFilters", "TELEVISION")
            }
          />
        </View>
      </View>
      <Divider />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Apply Filters"
          onPress={applyFiltersAndNavigate}
        />
        <PrimaryButton
          title="Clear Filters"
          onPress={clearFilters}
          buttonStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 16,
          }}
          titleStyle={{ color: "black" }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  tagContainer: {
    width: screenWidth * 0.9,
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    alignContent: "center",
    alignItems: "center",
    margin: 20,
    gap: 16,
  },
});

export default FiltersComponent;
