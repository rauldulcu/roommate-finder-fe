import React, { useState } from "react";
import { View, Image, Alert, TouchableOpacity } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import {
  DateInput,
  FilterTag,
  PrimaryButton,
  PrimaryInput,
} from "../../components";
import { NavigationProps, UserType } from "../../types";
import { styles } from "./styles";
import { styles as inputStyle } from "../../components/PrimaryInput/styles";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { dateToISO } from "../../common/formatDate";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../common/uploadImage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../App";

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [selectedOccupation, setSelectedOccupation] = useState<string>("");
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleOccupationSelect = (value: string) => {
    setSelectedOccupation(value);
  };

  const handleHobbySelect = (value: string) => {
    const newSelectedUtilities = [...selectedHobbies];
    const index = newSelectedUtilities.indexOf(value);

    if (index !== -1) {
      newSelectedUtilities.splice(index, 1);
    } else {
      newSelectedUtilities.push(value);
    }

    setSelectedHobbies(newSelectedUtilities);
  };

  const isHobbySelected = (value: string) => selectedHobbies.includes(value);

  const { createUser, createUserPending, createUserError } = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserType>({
    defaultValues: {
      name: "",
      description: "",
      hobbies: [],
      dateOfBirth: "",
      phoneNumber: "",
      gender: "",
      occupation: "",
      email: "",
      password: "",
    },
  });

  const pickImage = async () => {
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
      aspect: [3, 4],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets) {
      setAvatarURL(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setAvatarURL(null);
  };

  const onSubmit = async (data: UserType) => {
    let imageURL;
    if (avatarURL) {
      imageURL = await uploadImage(avatarURL);
    }
    data.dateOfBirth = dateToISO(data.dateOfBirth);
    data.hobbies = selectedHobbies;
    data.occupation = selectedOccupation;
    data.avatarURL = imageURL ? imageURL : undefined;
    createUser(data, {
      onSuccess: () => {
        navigation.navigate("Login");
      },
      onError: () => {
        setError("Email already in use");
      },
    });
  };

  if (createUserPending) {
    return (
      <View style={{ flex: 1, alignContent: "center" }}>
        <Text>Loading apartment info..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/register.png")}
            style={styles.logo}
          />
        </View>

        <Text h3 style={styles.loginTitle}>
          Tell us about yourself
        </Text>

        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <PrimaryInput
              placeholder="Name"
              onChange={(inputValue) => onChange(inputValue)}
              value={value}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <PrimaryInput
              placeholder="Description"
              onChange={(inputValue) => onChange(inputValue)}
              value={value}
              numOfLines={4}
            />
          )}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{
            required: "Date of birth is required",
            validate: (value) =>
              /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(
                value
              ) || "Invalid date format",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DateInput onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <PrimaryInput
              placeholder="Phone number"
              onChange={(inputValue) => onChange(inputValue)}
              value={value}
              keyboardType="phone-pad"
            />
          )}
        />
        {/* <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <PrimaryInput
              placeholder="University"
              onChange={(inputValue) => onChange(inputValue)}
              value={value}
            />
          )}
        /> */}
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View>
              {error && (
                <Text style={{ color: "red", fontSize: 16, marginLeft: 15 }}>
                  {error}
                </Text>
              )}
              <PrimaryInput
                placeholder="Email address"
                onChange={(inputValue) => onChange(inputValue)}
                value={value}
                keyboardType="email-address"
              />
            </View>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              containerStyle={inputStyle.inputContainer}
              inputContainerStyle={inputStyle.inputContainerStyle}
              inputStyle={inputStyle.inputStyle}
              leftIconContainerStyle={inputStyle.iconStyle}
              labelStyle={{ marginLeft: 15 }}
              placeholder="Password"
              value={value}
              onChangeText={(inputValue) => onChange(inputValue)}
              secureTextEntry={true}
            />
          )}
        />
        <Text style={styles.sectionTitle}>
          Select some hobbies that might interest you
        </Text>
        <View style={styles.tagContainer}>
          <FilterTag
            value="SPORTS"
            label="Sports"
            icon="sports-soccer"
            selected={isHobbySelected("SPORTS")}
            onSelect={handleHobbySelect}
          />
          <FilterTag
            value="GAMING"
            label="Gaming"
            icon="sports-esports"
            selected={isHobbySelected("GAMING")}
            onSelect={handleHobbySelect}
          />
          <FilterTag
            value="READING"
            label="Reading"
            icon="book"
            selected={isHobbySelected("READING")}
            onSelect={handleHobbySelect}
          />
          <FilterTag
            value="COOKING"
            label="Cooking"
            icon="outdoor-grill"
            selected={isHobbySelected("COOKING")}
            onSelect={handleHobbySelect}
          />
          <FilterTag
            value="GOINGOUT"
            label="Going Out"
            icon="nightlife"
            selected={isHobbySelected("GOINGOUT")}
            onSelect={handleHobbySelect}
          />
          <FilterTag
            value="MUSIC"
            label="Music"
            icon="piano"
            selected={isHobbySelected("MUSIC")}
            onSelect={handleHobbySelect}
          />
          <FilterTag
            value="PAINTING"
            label="Painting"
            icon="palette"
            selected={isHobbySelected("PAINTING")}
            onSelect={handleHobbySelect}
          />
          <FilterTag
            value="TELEVISION"
            label="Movies / TV Shows"
            icon="movie"
            selected={isHobbySelected("TELEVISION")}
            onSelect={handleHobbySelect}
          />
        </View>

        <Text style={styles.sectionTitle}>Select your occupation</Text>
        <View style={styles.tagContainer}>
          <FilterTag
            value="WORKING"
            label="Working"
            icon="work"
            selected={selectedOccupation === "WORKING"}
            onSelect={handleOccupationSelect}
          />
          <FilterTag
            value="STUDENT"
            label="Student"
            icon="school"
            selected={selectedOccupation === "STUDENT"}
            onSelect={handleOccupationSelect}
          />
        </View>

        <Text style={styles.sectionTitle}>Select a profile image</Text>
        {avatarURL ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: avatarURL }} style={styles.avatarImage} />
            <TouchableOpacity
              onPress={removeImage}
              style={styles.removeImageButton}
            >
              <Text>Remove Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.imagePickerButton}
            >
              <Text>Pick</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ alignItems: "center" }}>
          <PrimaryButton
            title="Register"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || selectedOccupation === ""}
          />
        </View>

        <Button
          title={"**Only available in Cluj-Napoca for now"}
          type="clear"
          disabled
          containerStyle={styles.registerText}
        />
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
