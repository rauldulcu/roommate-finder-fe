import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const SavedScreen: React.FC = () => {
  // Simulating dynamic data fetching
  const [apartments, setApartments] = useState(
    Array(8).fill({
      title: "Mănăștur",
      subTitle: "2 Bedrooms, 62 Sq.Ft. Apartment on Aleea Pean22a",
      price: "500",
      imageUrl:
        "https://www.apartments.com/blog/sites/default/files/styles/x_large/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=lYDRCGzC",
    })
  );

  useEffect(() => {
    // Simulate fetching data
    // fetchYourData().then(data => setApartments(data));
  }, []);

  const renderGrid = () => {
    // return apartments.map((apartment, index) => (
    //   <View style={styles.card} key={index}>
    //     <ApartmentCard {...apartment} />
    //   </View>
    // ));
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Your saved posts</Text>
        {/* <View style={styles.grid}>{renderGrid()}</View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
  },
  headerText: {
    marginBottom: 15,
    fontWeight: "800",
    fontSize: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: width / 2 - 20,
    marginBottom: 15,
  },
});

export default SavedScreen;
