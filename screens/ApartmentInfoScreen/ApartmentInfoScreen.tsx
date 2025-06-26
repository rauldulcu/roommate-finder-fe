import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import Carousel from "react-native-snap-carousel";
import BottomSheet from "@gorhom/bottom-sheet";
import { DeleteModal, PrimaryButton, UtilityBadge } from "../../components";
import { NavigationProps } from "../../types";
import { useGetApartmentById } from "../../hooks/apartments/useGetApartmentById";
import { utilityIconMapping } from "../../common/UtilityMapping";
import { Divider } from "@rneui/base";
import { calculateYearsFromTimestamp } from "../../common/calculateYears";
import { ScrollView } from "react-native-gesture-handler";
import { useDeleteApartment } from "../../hooks/apartments/useDeleteApartment";
import { styles } from "./styles";
import { useUser } from "../../context/UserContext/UserContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";

interface CarouselItem {
  imageURL: string;
}

const ApartmentInfoScreen: React.FC<NavigationProps<"ApartmentInfo">> = ({
  route,
}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const apartmentId = route!.params.apartmentId;
  const { apartment, apartmentError, apartmentLoading } =
    useGetApartmentById(apartmentId);
  const { loggedUser } = useUser();
  const { deleteApartmentId } = useDeleteApartment();
  const bottomSheetRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleOptions = () => setShowOptions(!showOptions);

  const renderCarouselItem = ({ item }: { item: CarouselItem }) => {
    return (
      <View>
        <Image
          source={{ uri: item.imageURL }}
          style={styles.carouselImage}
          fadeDuration={200}
        />
      </View>
    );
  };

  const screenWidth = Dimensions.get("window").width;

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

  const carouselData = apartment?.imageURLs
    ? apartment!.imageURLs.map((image) => ({ imageURL: image.imageURL }))
    : [
        {
          imageURL:
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
        },
      ];

  const handleDelete = () => {
    deleteApartmentId(apartment!.id);
    setShowModal(false);
    navigation.navigate("Home");
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
          style={styles.touchOverlay}
          activeOpacity={1}
          onPress={() => showOptions && setShowOptions(false)}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" type="material" color="black" size={30} />
        </TouchableOpacity>
        {(apartment.owner.id === loggedUser?.id ||
          loggedUser?.admin === true) && (
          <TouchableOpacity style={styles.optionButton} onPress={toggleOptions}>
            <Icon name="more-vert" type="material" color="black" size={30} />
          </TouchableOpacity>
        )}
        {showOptions && (
          <View style={styles.optionsCard}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditApartment", {
                  apartmentId: apartment.id,
                });
                setShowOptions(false);
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
                setShowOptions(false);
              }}
            >
              <Text style={{ fontSize: 16, color: "red", fontWeight: "500" }}>
                DELETE
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <DeleteModal
          isOpen={showModal}
          handleDelete={handleDelete}
          closeModal={() => setShowModal(false)}
        />
        {apartment.imageURLs.length > 0 ? (
          <Carousel
            data={carouselData}
            renderItem={renderCarouselItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            vertical={false}
            layoutCardOffset={50}
          />
        ) : (
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
            }}
            style={{ width: screenWidth, height: 450 }}
          />
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={["50%", "80%"]}
          enableOverDrag
          onChange={() => {
            setIsOpen(!isOpen);
          }}
        >
          <ScrollView>
            <View style={styles.card}>
              <View style={styles.landlordInfo}>
                <Avatar
                  rounded
                  source={{
                    uri:
                      apartment.owner.avatarURL ||
                      "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
                  }}
                  size="medium"
                />
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {apartment.owner.name}
                </Text>
              </View>
              <Text style={styles.propertyTitle}>{apartment.title}</Text>
              <Text style={styles.description}>{apartment.description}</Text>
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
              <Text style={styles.description}>
                {apartment.owner.description}
              </Text>
              <Text style={styles.description}>
                My age is:{" "}
                {calculateYearsFromTimestamp(apartment.owner.dateOfBirth)}
              </Text>
              {apartment.owner.hobbies.length > 0 && (
                <Text style={styles.description}>
                  My hobbies and interests include:{" "}
                </Text>
              )}
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
          </ScrollView>
        </BottomSheet>
      </View>
    );
};

export default ApartmentInfoScreen;
