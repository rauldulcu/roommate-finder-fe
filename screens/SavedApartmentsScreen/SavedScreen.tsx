import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import SavedApartmentCard from "../../components/SavedApartmentCard/SavedApartmentCard";
import { useGetSavedApartments } from "../../hooks/apartments/useGetSavedApartments";
import ApartmentCard from "../../components/ApartmentCard";

const SavedScreen = () => {
  const userId = 1;
  const {
    userSavedApartments,
    userSavedApartmentsLoading,
    userSavedApartmentsError,
  } = useGetSavedApartments(userId);

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
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 15 }}
        showsVerticalScrollIndicator={false}
      >
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    alignItems: "center",
    padding: 10,
  },
});

export default SavedScreen;
