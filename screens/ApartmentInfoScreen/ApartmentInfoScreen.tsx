import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import Carousel from "react-native-snap-carousel";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { PrimaryButton } from "../../components";
import UtilityBadge from "../../components/UtilityBadge/UtilityBadge";
import { NavigationProps } from "../../types";
import { useGetApartmentById } from "../../hooks/useGetApartmentById";
import { utilityIconMapping } from "../../common/UtilityMapping";
import { Divider } from "@rneui/base";
import { calculateYearsFromTimestamp } from "../../common/calculateYears";

interface CarouselItem {
  url: string;
}

const PropertyDetailScreen: React.FC<NavigationProps<"ApartmentInfo">> = ({
  navigation,
  route,
}) => {
  const apartmentId = route!.params.apartmentId;
  const bottomSheetRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const renderCarouselItem = ({ item }: { item: CarouselItem }) => {
    return (
      <View>
        <Image source={{ uri: item.url }} style={styles.carouselImage} />
      </View>
    );
  };

  const exampleItems = [
    {
      url: "https://moco360.media/wp-content/uploads/2017/12/rsz_dsc_7550_copy.jpg",
    },
    {
      url: "https://images.adsttc.com/media/images/5be3/3bc4/08a5/e549/e300/031a/newsletter/42449.jpg?1541618579",
    },
    {
      url: "https://images.adsttc.com/media/images/5be3/3a40/08a5/e549/e300/0315/slideshow/42442.jpg?1541618191",
    },
  ];

  const screenWidth = Dimensions.get("window").width;

  const { apartment, apartmentError, apartmentLoading } =
    useGetApartmentById(apartmentId);

  const makePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  if (apartmentLoading) {
    return (
      <View style={{ flex: 1, alignContent: "center" }}>
        <Text>Loading apartment info..</Text>
      </View>
    );
  }

  if (apartmentError) {
    return (
      <View style={{ flex: 1, alignContent: "center" }}>
        <Text>An error has occured</Text>
      </View>
    );
  }

  if (apartment)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" type="material" color="black" size={30} />
        </TouchableOpacity>
        <Carousel
          data={exampleItems}
          renderItem={renderCarouselItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          vertical={false}
          layoutCardOffset={50}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={["50%", "80%"]}
          enableOverDrag
          onChange={() => {
            setIsOpen(!isOpen);
          }}
        >
          <BottomSheetScrollView>
            <View style={styles.card}>
              <View style={styles.landlordInfo}>
                <Avatar
                  rounded
                  source={{
                    uri: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
                  }}
                  size="large"
                />
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {apartment.owner.name}
                </Text>
              </View>
              <Text style={styles.propertyTitle}>About Apartment</Text>
              <Text style={(styles.description, { textAlign: "center" })}>
                {apartment.description}
              </Text>
              <Divider style={{ marginTop: 15 }} />
              <Text style={styles.propertyTitle}>Utilities</Text>
              <View style={styles.tags}>
                {apartment.utilities.map((utility, index) => {
                  const { label, icon } = utilityIconMapping[utility];
                  return (
                    <UtilityBadge iconName={icon} value={label} key={index} />
                  );
                })}
              </View>
              <Divider style={{ marginTop: 15 }} />
              <Text style={styles.propertyTitle}>Address</Text>
              <Text style={styles.description}>
                {apartment.location.address}
              </Text>
              <Divider style={{ marginTop: 15 }} />
              <Text style={styles.propertyTitle}>About user</Text>
              <Text style={(styles.description, { textAlign: "center" })}>
                {apartment.owner.description}
              </Text>
              <Text style={(styles.description, { textAlign: "center" })}>
                My age is:{" "}
                {calculateYearsFromTimestamp(apartment.owner.dateOfBirth)}
              </Text>

              <Text style={(styles.description, { textAlign: "center" })}>
                My hobbies and interests include:{" "}
              </Text>
              <View style={styles.tags}>
                {apartment.owner.hobbies.map((hobby, index) => {
                  const { label, icon } = utilityIconMapping[hobby];
                  return (
                    <UtilityBadge iconName={icon} value={label} key={index} />
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  margin: 15,
                }}
              >
                <Text style={styles.price}>{apartment.price}€/month</Text>
                <PrimaryButton
                  title="Contact"
                  onPress={() =>
                    apartment && makePhoneCall(apartment.owner.phoneNumber)
                  }
                />
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
    alignContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  carouselImage: {
    width: "100%",
    height: "75%",
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  landlordInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  propertyTitle: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    marginTop: 15,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  description: {},
  price: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    marginTop: 35,
  },
});

export default PropertyDetailScreen;
