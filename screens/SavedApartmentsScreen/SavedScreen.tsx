import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import SavedApartmentCard from "../../components/SavedApartmentCard/SavedApartmentCard";
import { useGetSavedApartments } from "../../hooks/apartments/useGetSavedApartments";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={userSavedApartments}
        renderItem={({ item }) => <SavedApartmentCard apartment={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Create a grid layout with two columns
        contentContainerStyle={styles.list}
      />
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
