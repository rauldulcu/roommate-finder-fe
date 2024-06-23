import React, { useState, useEffect, useRef, useMemo } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Navigation } from "../../components";
import ApartmentCard from "../../components/ApartmentCard";
import { NavigationProps } from "../../types";
import { useGetApartments } from "../../hooks/apartments/useGetApartments";
import MapMarker from "../../components/MapMarker/MapMarker";
import { filterApartments } from "../../common/filterApartments";
import { ApartmentType } from "../../types/ApartmentType";
import { useFilters } from "../../context/FiltersContext/FitlersContext";
import { ScrollView } from "react-native-gesture-handler";

type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const HomeScreen: React.FC<NavigationProps<"Home">> = ({ navigation }) => {
  const { filters } = useFilters();

  const [filteredApartments, setFilteredApartments] = useState<
    ApartmentType[] | undefined
  >(undefined);

  const [visibleApartments, setVisibleApartments] = useState<
    ApartmentType[] | undefined
  >(undefined);

  const [region, setRegion] = useState<RegionType>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [visibleRegion, setVisibleRegion] = useState<RegionType>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
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
  }, [setRegion]);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["7%", "91%"], []);

  const { apartments, apartmentsLoading, apartmentsError } = useGetApartments();

  useEffect(() => {
    if (apartments && region) {
      const filteredData = filterApartments(apartments, filters);
      setFilteredApartments(filteredData);
    }
  }, [apartments, filters]);

  useEffect(() => {
    handleRegionChangeComplete(visibleRegion);
  }, [filteredApartments]);

  const handleRegionChangeComplete = (newRegion: RegionType) => {
    setVisibleRegion(newRegion);

    const { latitude, longitude, latitudeDelta, longitudeDelta } = newRegion;
    const northEastLat = latitude + latitudeDelta / 2;
    const southWestLat = latitude - latitudeDelta / 2;
    const northEastLng = longitude + longitudeDelta / 2;
    const southWestLng = longitude - longitudeDelta / 2;

    let filteredMapApartments;

    filteredMapApartments =
      filters && Object.values(filters).some((array) => array.length > 0)
        ? filteredApartments?.filter((apartment) => {
            const apartmentLat = apartment.location.latitude;
            const apartmentLng = apartment.location.longitude;
            return (
              apartmentLat >= southWestLat &&
              apartmentLat <= northEastLat &&
              apartmentLng >= southWestLng &&
              apartmentLng <= northEastLng
            );
          })
        : apartments?.filter((apartment) => {
            const apartmentLat = apartment.location.latitude;
            const apartmentLng = apartment.location.longitude;
            return (
              apartmentLat >= southWestLat &&
              apartmentLat <= northEastLat &&
              apartmentLng >= southWestLng &&
              apartmentLng <= northEastLng
            );
          });

    setVisibleApartments(filteredMapApartments);
  };

  if (apartmentsLoading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (apartmentsError) {
    return (
      <View style={styles.centeredView}>
        <Text>Error loading apartments.</Text>
      </View>
    );
  }

  return region.latitude !== 0 ? (
    <View style={{ flex: 1 }}>
      <Navigation navigation={navigation} />
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {filteredApartments && filteredApartments.length > 0
          ? filteredApartments.map((apartment, index) => (
              <MapMarker
                key={index}
                latitude={apartment.location.latitude}
                longitude={apartment.location.longitude}
                price={apartment.price}
                apartmentId={apartment.id}
              />
            ))
          : filters && Object.values(filters).some((array) => array.length > 0)
          ? null
          : apartments?.map((apartment, index) => (
              <MapMarker
                key={index}
                latitude={apartment.location.latitude}
                longitude={apartment.location.longitude}
                price={apartment.price}
                apartmentId={apartment.id}
              />
            ))}
      </MapView>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingBottom: 15 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ marginBottom: 15 }}>
            {visibleApartments && visibleApartments.length > 0
              ? visibleApartments.length > 1
                ? `Found ${visibleApartments.length} apartments!`
                : "Found 1 apartment!"
              : "No apartments found."}
          </Text>
          {visibleApartments && visibleApartments.length > 0
            ? visibleApartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))
            : filters &&
              Object.values(filters).some((array) => array.length > 0)}
          {apartmentsLoading && <Text>Loading...</Text>}
        </ScrollView>
      </BottomSheet>
    </View>
  ) : (
    <View style={styles.centeredView}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
