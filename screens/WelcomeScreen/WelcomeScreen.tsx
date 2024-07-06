import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
import { Text } from "@rneui/themed";
import { PrimaryButton } from "../../components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Image source={{ uri: "path_to_your_logo.png" }} />
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
