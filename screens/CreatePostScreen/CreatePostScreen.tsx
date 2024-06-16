import React, { useState, useMemo, useRef } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FilterTag from "../../components/FilterTag";
import { PrimaryButton, PrimaryInput } from "../../components";
import BottomSheet from "@gorhom/bottom-sheet";
import { Divider, Icon } from "@rneui/base";
import { NavigationProps } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { LocationType } from "../../types/LocationType";
import { useCreateLocation } from "../../hooks/useCreateLocation";
import { useCreateApartment } from "../../hooks/useCreateApartment";

export type CreatePostScreenValues = {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  zone: string | null;
  utilities: string[];
  locationId: number | undefined;
  ownerId: number;
};

const CreatePostScreen: React.FC<NavigationProps<"CreatePost">> = ({
  navigation,
}) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([]);

  const [apartmentLocation, setApartmentLocation] =
    useState<LocationType | null>(null);

  const snapPoints = useMemo(() => ["75%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { createLocation, createdLocation, createLocationSuccess } =
    useCreateLocation();

  const { createApartment } = useCreateApartment();

  const handleZoneSelect = (value: string) => {
    setSelectedZone(value);
  };

  const handleUtilitySelect = (value: string) => {
    const newSelectedUtilities = [...selectedUtilities];
    const index = newSelectedUtilities.indexOf(value);

    if (index !== -1) {
      newSelectedUtilities.splice(index, 1);
    } else {
      newSelectedUtilities.push(value);
    }

    setSelectedUtilities(newSelectedUtilities);
  };

  const isUtilitySelected = (value: string) =>
    selectedUtilities.includes(value);

  const handleLocationSelect = (details: GooglePlaceDetail) => {
    setApartmentLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      zone: selectedZone!,
      address: details.formatted_address,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePostScreenValues>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      price: 0,
      zone: "",
      utilities: [],
    },
  });

  const onSubmit = (data: CreatePostScreenValues) => {
    console.log(apartmentLocation);
    apartmentLocation &&
      createLocation(
        {
          address: apartmentLocation.address,
          latitude: apartmentLocation.latitude,
          longitude: apartmentLocation.longitude,
          zone: selectedZone!,
        },
        {
          onSuccess: (createdLocation) => {
            const apartmentData = {
              ...data,
              utilities: selectedUtilities,
              zone: createdLocation.zone,
              locationId: createdLocation.id,
              ownerId: 6,
            };
            createApartment(apartmentData);
            navigation.navigate("Home");
          },
        }
      );
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" type="material" color="black" size={30} />
      </TouchableOpacity>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Romania-2382_-_View_from_Hotel_%287794313314%29.jpg",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={{ paddingHorizontal: 10, paddingTop: 10 }}
        handleComponent={null}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps={"always"}
        >
          <View style={styles.formContainer}>
            <Text style={styles.header}>Tell us about your place</Text>
            <Divider />

            <Text style={styles.label}>Title</Text>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <PrimaryInput
                  placeholder="Enter the title"
                  onChange={(inputValue) => onChange(inputValue)}
                  value={value}
                />
              )}
            />

            <Text style={styles.label}>Subtitle</Text>
            <Controller
              name="subtitle"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <PrimaryInput
                  placeholder="Enter the subtitle"
                  onChange={(inputValue) => onChange(inputValue)}
                  value={value}
                />
              )}
            />

            <Text style={styles.label}>Address</Text>
            <View>
              <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder="Search for an address"
                onPress={(data, details) => {
                  details && handleLocationSelect(details);
                }}
                query={{
                  key: "AIzaSyCb94w_cBkco15e7u0uIz2F_bD51zswzxM",
                  language: "en",
                }}
                styles={{
                  textInputContainer: styles.inputContainer,
                  textInput: styles.inputContainerStyle,
                }}
                disableScroll={true}
                onFail={(error) => console.error(error)}
              />
            </View>

            <Text style={styles.label}>Description</Text>
            <Controller
              name="description"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field: { onChange, value } }) => (
                <PrimaryInput
                  placeholder="Enter a short description"
                  onChange={(inputValue) => onChange(inputValue)}
                  value={value}
                  numOfLines={5}
                />
              )}
            />

            <Text style={styles.label}>Price</Text>
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <PrimaryInput
                  placeholder="Price"
                  onChange={(inputValue) => onChange(inputValue)}
                  value={value}
                  rightIcon="euro"
                />
              )}
            />

            <Text style={styles.label}>Zone (Single Selection)</Text>
            <View style={styles.tagContainer}>
              <FilterTag
                value="MANASTUR"
                label="Mănăștur"
                icon="map"
                selected={selectedZone === "MANASTUR"}
                onSelect={handleZoneSelect}
              />
              <FilterTag
                value="MARASTI"
                label="Mărăști"
                icon="map"
                selected={selectedZone === "MARASTI"}
                onSelect={handleZoneSelect}
              />
              <FilterTag
                value="GRIGORESCU"
                label="Grigorescu"
                icon="map"
                selected={selectedZone === "GRIGORESCU"}
                onSelect={handleZoneSelect}
              />
              <FilterTag
                value="ZORILOR"
                label="Zorilor"
                icon="map"
                selected={selectedZone === "ZORILOR"}
                onSelect={handleZoneSelect}
              />
            </View>

            <Text style={styles.label}>Utilities (Multiple Selection)</Text>
            <View style={styles.tagContainer}>
              <FilterTag
                value="SMARTTV"
                label="Smart TV"
                icon="tv"
                selected={isUtilitySelected("SMARTTV")}
                onSelect={handleUtilitySelect}
              />
              <FilterTag
                value="WIFI"
                label="WiFi"
                icon="wifi"
                selected={isUtilitySelected("WIFI")}
                onSelect={handleUtilitySelect}
              />
              <FilterTag
                value="PETFRIENDLY"
                label="Pet Friendly"
                icon="pets"
                selected={isUtilitySelected("PETFRIENDLY")}
                onSelect={handleUtilitySelect}
              />
              <FilterTag
                value="AIRCONDITIONED"
                label="Air Conditioned"
                icon="ac-unit"
                selected={isUtilitySelected("AIRCONDITIONED")}
                onSelect={handleUtilitySelect}
              />
              <FilterTag
                value="DISHWASHER"
                label="Dishwasher"
                icon="local-laundry-service"
                selected={isUtilitySelected("DISHWASHER")}
                onSelect={handleUtilitySelect}
              />
              <FilterTag
                value="MICROWAVE"
                label="Microwave"
                icon="microwave"
                selected={isUtilitySelected("MICROWAVE")}
                onSelect={handleUtilitySelect}
              />
            </View>
            <Divider style={{ marginTop: 15 }} />

            <View style={{ alignItems: "center", marginTop: 30 }}>
              <PrimaryButton
                title="Post"
                onPress={handleSubmit(onSubmit)}
                disabled={
                  !isValid ||
                  selectedZone === null ||
                  apartmentLocation === null
                }
              />
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "35%",
    position: "absolute",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 20,
    zIndex: 10,
    borderRadius: 20,
    padding: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomSheetContainer: {
    flex: 1,
    marginTop: 50,
  },
  bottomSheet: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  formContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 16,
  },
  textArea: {
    height: 100,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputContainer: {
    paddingHorizontal: 10,
    fontSize: 50,
  },
  inputContainerStyle: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 16,
    marginBottom: 24,
  },
});

export default CreatePostScreen;
