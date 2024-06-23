import React, { useState, useMemo, useRef, useEffect } from "react";
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
import { useCreateLocation } from "../../hooks/locations/useCreateLocation";
import { useGetApartmentById } from "../../hooks/apartments/useGetApartmentById";
import { useUpdateApartment } from "../../hooks/apartments/useUpdateApartment";
import { UserType } from "../../types/UserType";

export type EditApartmentScreenValues = {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  owner: UserType;
  zone: string | null;
  utilities: string[];
  location: LocationType;
};

const EditApartmentScreen: React.FC<NavigationProps<"EditApartment">> = ({
  navigation,
  route,
}) => {
  const apartmentId = route!.params.apartmentId;

  const { apartment, apartmentError, apartmentLoading } =
    useGetApartmentById(apartmentId);

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [address, setAddress] = useState(apartment?.location.address);
  const [autocompleteValue, setAutocompleteValue] = useState(
    apartment?.location.address
  );
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([]);
  const [apartmentLocation, setApartmentLocation] =
    useState<LocationType | null>(null);

  const snapPoints = useMemo(() => ["75%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { createLocation } = useCreateLocation();

  const { updateApartment } = useUpdateApartment();

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
    setAutocompleteValue(details.formatted_address);
  };

  useEffect(() => {
    if (apartment) {
      setSelectedUtilities(apartment.utilities);
      setSelectedZone(apartment.location.zone);
      setAddress(apartment.location.address);
      setAutocompleteValue(address);
    }
  }, [apartment]);

  const handleInputChange = (text: string) => {
    setAutocompleteValue(text);
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<EditApartmentScreenValues>({
    defaultValues: {
      title: apartment?.title,
      subtitle: apartment?.subtitle,
      description: apartment?.description,
      price: apartment?.price || 0,
      zone: apartment?.location.zone,
      utilities: apartment?.utilities,
    },
  });

  const onSubmit = (data: EditApartmentScreenValues) => {
    if (apartmentLocation !== null) {
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
              location: createdLocation,
              owner: apartment!.owner,
            };
            updateApartment({ id: apartment!.id, apartment: apartmentData });
            navigation.navigate("ApartmentInfo", {
              apartmentId: apartment!.id,
            });
          },
        }
      );
    } else {
      data.location = apartment!.location;
      data.owner = apartment!.owner;
      data.zone = selectedZone;
      data.utilities = selectedUtilities;
      updateApartment({ id: apartment!.id, apartment: data });
      navigation.navigate("ApartmentInfo", { apartmentId: apartment!.id });
    }
  };

  if (apartmentLoading) {
    return (
      <View style={{ flex: 1, alignContent: "center" }}>
        <Text>Loading apartment info..</Text>
      </View>
    );
  }

  if (apartmentError) {
    return (
      <View style={{ flex: 1, alignContent: "center" }}>
        <Text>An error has occured</Text>
      </View>
    );
  }

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
          showsVerticalScrollIndicator={false}
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
                  location: `${46.7712},${23.6236}`,
                  radius: 5000,
                  strictbounds: true,
                }}
                styles={{
                  textInputContainer: styles.inputContainer,
                  textInput: styles.inputContainerStyle,
                }}
                disableScroll={true}
                onFail={(error) => console.error(error)}
                textInputProps={{
                  value: autocompleteValue,
                  onChange: handleInputChange,
                }}
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
                  value={String(value)}
                  rightIcon="euro"
                  keyboardType="numeric"
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
                disabled={!isValid || selectedZone === null}
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

export default EditApartmentScreen;
