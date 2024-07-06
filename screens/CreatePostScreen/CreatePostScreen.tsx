import React, { useState, useMemo, useRef } from "react";
import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import { FilterTag, PrimaryButton, PrimaryInput } from "../../components";
import BottomSheet from "@gorhom/bottom-sheet";
import { Divider, Icon } from "@rneui/base";
import { NavigationProps } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { LocationType } from "../../types";
import { useCreateApartment } from "../../hooks/apartments/useCreateApartment";
import { useCreateLocation } from "../../hooks/locations/useCreateLocation";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../common/uploadImage";
import { styles } from "./styles";
import { useUser } from "../../context/UserContext/UserContext";

export type CreatePostScreenValues = {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  zone: string | null;
  utilities: string[];
  locationId: number | undefined;
  ownerId: number;
  imageURLs?: string[];
};

const CreatePostScreen: React.FC<NavigationProps<"CreatePost">> = ({
  navigation,
}) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([]);
  const [apartmentLocation, setApartmentLocation] = useState<Omit<
    LocationType,
    "id"
  > | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const snapPoints = useMemo(() => ["75%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { loggedUser, loading } = useUser();
  const { createLocation } = useCreateLocation();

  const { createApartment, createApartmentPending } = useCreateApartment();

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
      imageURLs: undefined,
    },
  });

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permissions to make this work!`
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setFiles(result.assets.map((asset) => asset.uri));
      setError("");
    }
  };

  const removeImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CreatePostScreenValues) => {
    try {
      let imageUrls: string[];
      if (files) {
        const imageUploadPromises = files.map((file) => uploadImage(file));
        imageUrls = (await Promise.all(imageUploadPromises)) as string[];
      } else {
        imageUrls = [];
      }

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
                ownerId: loggedUser!.id,
                imageURLs: imageUrls,
              };
              createApartment(apartmentData);
              navigation.navigate("Home");
            },
          }
        );
    } catch (error) {
      console.error("Error uploading images: ", error);
      setError("Error uploading images");
    }
  };

  if (createApartmentPending || loading) {
    return (
      <View style={{ flex: 1, alignContent: "center" }}>
        <Text>Loading apartment info..</Text>
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
              <FilterTag
                value="CENTRU"
                label="Centru"
                icon="map"
                selected={selectedZone === "CENTRU"}
                onSelect={handleZoneSelect}
              />
              <FilterTag
                value="GRUIA"
                label="Gruia"
                icon="map"
                selected={selectedZone === "GRUIA"}
                onSelect={handleZoneSelect}
              />
              <FilterTag
                value="GHEORGHENI"
                label="Gheorgheni"
                icon="map"
                selected={selectedZone === "GHEORGHENI"}
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

            <TouchableOpacity onPress={pickImages}>
              <Text style={styles.label}>Choose Images</Text>
            </TouchableOpacity>
            {files ? (
              <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                {files.map((file, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image
                      source={{ uri: file }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 8,
                        margin: 5,
                      }}
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => removeImage(index)}
                    >
                      <Icon
                        name="close"
                        type="material"
                        color="white"
                        size={15}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <Text>{error}</Text>
            )}

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

export default CreatePostScreen;
