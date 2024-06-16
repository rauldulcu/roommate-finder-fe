import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";

type MapMarkerProps = {
  latitude: number;
  longitude: number;
  price: number;
  apartmentId: number;
};

const MapMarker: React.FC<MapMarkerProps> = ({
  latitude,
  longitude,
  price,
  apartmentId,
}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <Marker
      coordinate={{ latitude, longitude }}
      onPress={() =>
        navigation.navigate("ApartmentInfo", { apartmentId: apartmentId })
      }
    >
      <View style={styles.markerStyle}>
        <Text style={styles.textStyle}>€{price}</Text>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerStyle: {
    width: 60, // Increased width
    height: 30, // Decreased height
    backgroundColor: "#fff",
    borderRadius: 15, // Adjusted to fit the new shape
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  textStyle: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default MapMarker;
