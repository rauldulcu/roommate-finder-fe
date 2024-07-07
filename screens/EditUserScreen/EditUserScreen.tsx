import { Avatar, Card, Divider, Icon, Text } from "@rneui/base";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationProps, UserType } from "../../types";
import {
  DateInput,
  DeleteModal,
  FilterTag,
  PrimaryButton,
  PrimaryInput,
} from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useGetUserById } from "../../hooks/users/useGetUserById";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { dateToISO, formatDate } from "../../common/formatDate";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../common/uploadImage";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";
import { styles } from "./styles";
import { useUser } from "../../context/UserContext/UserContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../App";

const EditUserScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    ""
  );
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [avatarURL, setAvatarURL] = useState<string | undefined | null>(
    undefined
  );
  const [error, setError] = useState<string>("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const { loggedUser, loading, handleLogout } = useUser();
  const { user, userError, userLoading } = useGetUserById(loggedUser!.id);
  const { updateUser, updateUserPending } = useUpdateUser();
  const { deleteUserId } = useDeleteUser();

  useEffect(() => {
    if (user !== undefined) {
      setSelectedHobbies(user!.hobbies);
      setSelectedOccupation(user!.occupation);
      setAvatarURL(user.avatarURL);
    }
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets) {
      setAvatarURL(result.assets[0].uri);
      setError("");
      setIsImageChanged(true);
    }
  };

  const removeImage = () => {
    setAvatarURL(undefined);
  };

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
      avatarURL: user?.avatarURL,
      password: user?.password,
    },
  });

  const onSubmit = async (data: UserType) => {
    let imageURL;
    if (isImageChanged && avatarURL) {
      imageURL = await uploadImage(avatarURL);
    } else {
      imageURL = avatarURL;
    }

    if (data.dateOfBirth && selectedOccupation) {
      data.dateOfBirth = dateToISO(data.dateOfBirth);
      data.hobbies = selectedHobbies;
      data.occupation = selectedOccupation;
      data.avatarURL = imageURL;
      updateUser(
        { id: loggedUser!.id, user: data },
        {
          onSuccess: () => {
            navigation.navigate("Profile");
          },
        }
      );
    } else {
      console.error("Date of Birth or Occupation is undefined");
    }
  };

  const handleDelete = () => {
    deleteUserId(loggedUser!.id);
    setShowModal(false);
    handleLogout();
    navigation.navigate("Welcome");
  };

  if (userLoading || updateUserPending) {
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
            <View style={styles.avatarContainer}>
              <Avatar
                rounded
                source={{
                  uri:
                    avatarURL ||
                    "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
                }}
                size="xlarge"
                containerStyle={styles.avatar}
              />
              <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                <Icon name="edit" size={24} color="#fff" />
              </TouchableOpacity>
              {avatarURL && (
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={removeImage}
                >
                  <Icon name="remove-circle" size={24} color="#ff0000" />
                </TouchableOpacity>
              )}
            </View>

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

            {/* <View style={styles.infoRow}>
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
            </View> */}

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
              onPress={() => setShowModal(true)}
            />
          </View>
          <DeleteModal
            isOpen={showModal}
            handleDelete={handleDelete}
            closeModal={() => setShowModal(false)}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default EditUserScreen;
