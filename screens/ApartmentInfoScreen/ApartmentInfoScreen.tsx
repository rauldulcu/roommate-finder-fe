import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Avatar, Button, Card, Icon, Badge } from "@rneui/themed";
import Carousel from "react-native-snap-carousel";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PrimaryButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import ScreenNavigationType from "../../types/ScreenNavigationType";
import UtilityBadge from "../../components/UtilityBadge/UtilityBadge";

const PropertyDetailScreen: React.FC = () => {
  const images = ["image1_url", "image2_url", "image3_url"]; // replace with your image URLs
  const bottomSheetRef = React.useRef(null);

  // const renderCarouselItem = ({ item, index }) => (
  //   <Image source={{ uri: item }} style={styles.carouselImage} />
  // );

  return (
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={["45%", "65%"]}>
        <BottomSheetScrollView>
          <View style={styles.card}>
            {/* Avatar and Landlord Info */}
            <View style={styles.landlordInfo}>
              <Avatar
                rounded
                source={{
                  uri: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
                }}
                size="large"
              />
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Gaurav Aneja
              </Text>
            </View>
            {/* Property Title and Tags */}
            <Text style={styles.propertyTitle}>2BHK Flat to Rent</Text>
            <Text style={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <Text style={styles.propertyTitle}>Utilities</Text>
            <View style={styles.tags}>
              <UtilityBadge value="Rooms" />
              <UtilityBadge value="Fully-Furnished" />
              <UtilityBadge value="Balcony" />
            </View>
            {/* Price and Chat Button */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: 40,
              }}
            >
              <Text style={styles.price}>₹20,000/month</Text>
              <PrimaryButton title="Contact" />
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  carouselImage: {
    width: "100%", // Adjust the width as needed
    height: 300, // Adjust the height as needed
  },
  card: {
    borderRadius: 16, // Adjust for rounded corners
    padding: 16,
    // Add any additional styling for the card
  },
  landlordInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // Add any additional styling
  },
  propertyTitle: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    marginTop: 15,
    // Add any additional styling
  },
  tags: {
    flexDirection: "row",
  },
  description: {
    // Add any additional styling
  },
  price: {
    fontWeight: "bold",
    marginBottom: 10,
    // Add any additional styling
  },
  // Add any additional styles you need
});

export default PropertyDetailScreen;
