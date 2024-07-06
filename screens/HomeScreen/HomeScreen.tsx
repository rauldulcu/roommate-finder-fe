import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ApartmentCard, MapMarker, Navigation } from "../../components";
import { NavigationProps } from "../../types";
import { useGetApartments } from "../../hooks/apartments/useGetApartments";
import { filterApartments } from "../../common/filterApartments";
import { ApartmentType } from "../../types/ApartmentType";
import { useFilters } from "../../context/FiltersContext/FiltersContext";
import { ScrollView } from "react-native-gesture-handler";
import { useGetUserById } from "../../hooks/users/useGetUserById";
import { sortApartments } from "../../common/calculateScore";
import { styles } from "./styles";
import { useUser } from "../../context/UserContext/UserContext";
import { useFocusEffect } from "@react-navigation/native";

type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const HomeScreen: React.FC<NavigationProps<"Home">> = ({ navigation }) => {
  const { filters } = useFilters();
  const { loggedUser, loading } = useUser();
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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );

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
  const { user, userLoading } = useGetUserById(loggedUser!.id);

  useEffect(() => {
    if (apartments && region) {
      const filteredData = filterApartments(apartments, filters);
      setFilteredApartments(filteredData);
      if (user && filteredApartments) {
        const sortedApartments = sortApartments(user, filteredApartments);
        setVisibleApartments([...sortedApartments]);
      }
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

    if (user && filteredMapApartments) {
      const sortedApartments = sortApartments(user, filteredMapApartments);
      setVisibleApartments([...sortedApartments]);
    }
  };

  if (apartmentsLoading || loading) {
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

export default HomeScreen;
