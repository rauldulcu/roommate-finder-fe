import React, { useState, useEffect, useRef, useMemo } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Navigation from "../../components/Navigation/Navigation";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CustomCard from "../../components/ApartmentCard/ApartmentCard";

const HomeScreen: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["7%", "91%"], []);

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={(region) => setRegion(region)}
      ></MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // This is the initial snap point index
        snapPoints={snapPoints}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ alignItems: "center", marginBottom: 20 }}
        >
          <Text style={{ marginBottom: 15 }}>Idiots scroll this up!</Text>
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;
