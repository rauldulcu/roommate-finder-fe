import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useGetSavedApartments } from "../../hooks/apartments/useGetSavedApartments";
import { Icon } from "@rneui/base";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";
import { ApartmentCard } from "../../components";
import { styles } from "./styles";
import { useUser } from "../../context/UserContext/UserContext";

const SavedApartmentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const { loggedUser } = useUser();

  const {
    userSavedApartments,
    userSavedApartmentsLoading,
    userSavedApartmentsError,
  } = useGetSavedApartments(loggedUser!.id);

  if (userSavedApartmentsLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (userSavedApartmentsError) {
    return (
      <View style={styles.centered}>
        <Text>Error loading apartments.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" type="material" color="black" size={30} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>These are your saved apartments</Text>
        {userSavedApartments &&
          userSavedApartments.length > 0 &&
          userSavedApartments?.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        {userSavedApartmentsLoading && <Text>Loading...</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedApartmentsScreen;
