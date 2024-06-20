import { Avatar, Card, Divider, Icon, Text } from "@rneui/base";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { NavigationProps } from "../../types";
import { PrimaryButton, PrimaryInput } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useGetUserById } from "../../hooks/users/useGetUserById";
import { Controller, useForm } from "react-hook-form";
import { UserType } from "../../types/UserType";
import FilterTag from "../../components/FilterTag";
import { useEffect, useState } from "react";
import DateInput from "../../components/DateInput/DateInput";
import { dateToISO, formatDate } from "../../common/formatDate";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";

const screenWidth = Dimensions.get("window").width;

const EditProfile: React.FC<NavigationProps<"EditProfile">> = ({
  navigation,
}) => {
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null
  );

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

  const { user, userError, userLoading } = useGetUserById(13);
  const { updateUser } = useUpdateUser();

  useEffect(() => {
    if (user !== undefined) {
      setSelectedHobbies(user!.hobbies);
      setSelectedOccupation(user!.occupation);
    }
  }, [user]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserType>({
    defaultValues: {
      name: user?.name,
      description: user?.description,
      hobbies: user?.hobbies,
      dateOfBirth: formatDate(user!.dateOfBirth),
      phoneNumber: user?.phoneNumber,
      gender: user?.gender,
      occupation: user?.occupation,
      email: user?.email,
    },
  });

  const onSubmit = (data: UserType) => {
    data.dateOfBirth = dateToISO(data.dateOfBirth);
    data.hobbies = selectedHobbies;
    console.log(data);
    updateUser(
      { id: 13, user: data },
      {
        onSuccess: () => {
          navigation.navigate("Profile");
        },
      }
    );
  };

  if (userLoading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (userError) {
    return (
      <View style={styles.centeredView}>
        <Text>Error loading user.</Text>
      </View>
    );
  }

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" type="material" color="black" size={35} />
          </TouchableOpacity>
          <Card
            wrapperStyle={{ alignItems: "center" }}
            containerStyle={styles.card}
          >
            <Avatar
              rounded
              source={{
                uri: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg",
              }}
              size="xlarge"
              containerStyle={{ marginBottom: 20 }}
            />

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
          </Card>

          <Text style={styles.sectionTitle}>Edit your profile</Text>
          <Text>
            Welcome to your 'Edit Profile' page. Here, you can change the
            information other users may view about you.
          </Text>
          <Divider style={{ marginTop: 20 }} />

          <Text style={styles.sectionTitle}>Short summary</Text>
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
          <Divider />

          <Text style={styles.sectionTitle}>Your hobbies and interests</Text>
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
              icon="lunch-dining"
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
          <Divider style={{ marginTop: 20 }} />

          <Text style={styles.sectionTitle}>Other relevant information</Text>
          <View style={{ padding: 5 }}>
            <View style={styles.infoRow}>
              <View style={styles.labelContainer}>
                <Icon name="cake" type="material" />
                <Text style={styles.infoText}>Date of birth:</Text>
              </View>
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
                  <DateInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.infoRow}>
              <View style={styles.labelContainer}>
                <Icon name="phone" type="material" />
                <Text style={styles.infoText}>Phone number:</Text>
              </View>
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
            </View>

            <View style={styles.infoRow}>
              <View style={styles.labelContainer}>
                <Icon name="work" type="material" />
                <Text style={styles.infoText}>Occupation: </Text>
              </View>
              <View style={styles.occupationContainer}>
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
            </View>

            <View style={styles.infoRow}>
              <View style={styles.labelContainer}>
                <Icon name="school" type="material" />
                <Text style={styles.infoText}>Went to:</Text>
              </View>
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
            </View>

            <View style={styles.infoRow}>
              <View style={styles.labelContainer}>
                <Icon name="email" type="material" />
                <Text style={styles.infoText}>Email: </Text>
              </View>

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
            </View>
          </View>

          <View style={{ alignItems: "center", marginTop: 30, gap: 20 }}>
            <PrimaryButton
              title="Save changes"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            />
            <PrimaryButton
              buttonStyle={{ backgroundColor: "red" }}
              title={"Delete profile"}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignContent: "center",
  },
  card: {
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 75,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 5,
    zIndex: 10,
  },
  editButton: {
    position: "absolute",
    top: 25,
    right: 5,
    zIndex: 10,
  },
  section: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontWeight: "900",
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 3,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  tagContainer: {
    width: screenWidth * 0.9,
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  occupationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 45,
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
