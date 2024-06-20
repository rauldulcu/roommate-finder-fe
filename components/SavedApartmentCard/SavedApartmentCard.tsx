import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card } from "@rneui/base";
import { ApartmentType } from "../../types/ApartmentType";

type SavedAprtmentCardType = {
  apartment: ApartmentType;
};

const SavedApartmentCard: React.FC<SavedAprtmentCardType> = ({ apartment }) => {
  return (
    <Card containerStyle={styles.card}>
      <Image
        source={{
          uri: "https://www.apartments.com/blog/sites/default/files/styles/x_large/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=lYDRCGzC",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{apartment.title}</Text>
      <Text style={styles.price}>{`${apartment.price} €/month`}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {apartment.description}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 10,
    margin: 5,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
  },
  price: {
    fontSize: 12,
    color: "grey",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "darkgrey",
  },
});

export default SavedApartmentCard;
