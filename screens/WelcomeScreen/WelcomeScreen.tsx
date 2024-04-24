import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
import { Text } from "@rneui/themed";
import { PrimaryButton } from "../../components";
import { NavigationProps } from "../../types";

const WelcomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "path_to_your_logo.png" }} // Replace with your logo's path
      />
      <Image source={require("../../assets/welcomeIcon.png")} alt="img" />
      <Text style={styles.subtitle}>
        Browse and find potential roommates and rental buildings in the city.
      </Text>
      <PrimaryButton
        title="Get Started"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default WelcomeScreen;
