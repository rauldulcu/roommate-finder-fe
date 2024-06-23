import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, Text } from "@rneui/themed";
import { PrimaryButton, PrimaryInput } from "../../components";
import { NavigationProps } from "../../types";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { UserType } from "../../types/UserType";
import DateInput from "../../components/DateInput/DateInput";
import FilterTag from "../../components/FilterTag";
import { ScrollView } from "react-native-gesture-handler";
import { dateToISO } from "../../common/formatDate";
import { useCreateUser } from "../../hooks/users/useCreateUser";

const RegisterScreen: React.FC<NavigationProps<"Register">> = ({
  navigation,
}) => {
  const [selectedOccupation, setSelectedOccupation] = useState<string>("");

  const handleOccupationSelect = (value: string) => {
    setSelectedOccupation(value);
  };

  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

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

  const { createUser } = useCreateUser();

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
    },
  });

  const onSubmit = (data: UserType) => {
    data.dateOfBirth = dateToISO(data.dateOfBirth);
    data.hobbies = selectedHobbies;
    data.occupation = selectedOccupation;
    createUser(data);
    navigation.navigate("Login");
  };

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
        <Controller
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
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <PrimaryInput
              placeholder="Email address"
              onChange={(inputValue) => onChange(inputValue)}
              value={value}
              keyboardType="email-address"
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
