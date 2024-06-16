import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Card, Icon } from "@rneui/base";
import PrimaryButton from "../PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ApartmentType } from "../../types/ApartmentType";

type ApartmentCardProps = {
  apartment?: ApartmentType;
};

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [saved, setSaved] = useState(false);

  return (
    <Card containerStyle={styles.cardContainer}>
      <Image
        source={{
          uri: "https://www.apartments.com/blog/sites/default/files/styles/x_large/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=lYDRCGzC",
        }}
        style={styles.image}
      />
      <View style={styles.textContent}>
        <Text style={styles.title}>{apartment?.title}</Text>
        <Text style={styles.subTitle}>{apartment?.subtitle}</Text>
        <View style={styles.rentInfo}>
          <Text style={styles.rentText}>Price: </Text>
          <Text style={styles.rentPrice}>{apartment?.price}€/month</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        containerStyle={styles.bookmarkIcon}
        onPress={() => setSaved(!saved)}
      >
        <Icon
          name={saved ? "bookmark" : "bookmark-outline"}
          type="material"
          color="#fff"
        />
      </TouchableOpacity>
      <Card.Divider />
      <PrimaryButton
        title={"View Apartment"}
        onPress={() =>
          navigation.navigate("ApartmentInfo", { apartmentId: apartment!.id })
        }
      />
    </Card>
  );
};

export default ApartmentCard;
