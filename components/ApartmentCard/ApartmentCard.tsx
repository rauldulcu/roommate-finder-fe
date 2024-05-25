import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, Icon } from "@rneui/base";
import PrimaryButton from "../PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";

const CustomCard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <Card containerStyle={styles.cardContainer}>
      <Image
        source={{
          uri: "https://www.apartments.com/blog/sites/default/files/styles/x_large/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=lYDRCGzC",
        }} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.textContent}>
        <Text style={styles.title}>Mohali Sector 82</Text>
        <Text style={styles.subTitle}>
          2 Bedrooms, 2695 Sq.Ft. Apartment in Mohali Sector 82
        </Text>
        <View style={styles.rentInfo}>
          <Text style={styles.rentText}>Price: </Text>
          <Text style={styles.rentPrice}>₹20,000/month</Text>
        </View>
      </View>
      <Icon
        name="bookmark-outline" // Change to the bookmark icon you have
        type="material" // This is just an example, adjust based on the icon set you use
        color="#fff"
        containerStyle={styles.bookmarkIcon}
      />
      <PrimaryButton
        title={"Press me"}
        onPress={() => navigation.navigate("ApartmentInfo")}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    elevation: 5, // Shadow for Android
    shadowColor: "#000000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  rentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rentText: {
    fontSize: 14,
    color: "#000",
  },
  rentPrice: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  bookmarkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default CustomCard;
