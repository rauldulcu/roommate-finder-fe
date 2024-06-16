import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, Text } from "@rneui/themed";
import { PrimaryButton, PrimaryInput } from "../../components";
import { NavigationProps } from "../../types";
import { styles } from "./styles";

const LoginScreen: React.FC<NavigationProps<"Login">> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/welcomeIcon.png")}
        style={styles.logo}
      />
      <Text h3 style={styles.loginTitle}>
        Login
      </Text>
      {/* <PrimaryInput
        placeholder="Mobile Number*"
        leftIcon={{ type: "font-awesome", name: "phone" }}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <PrimaryInput
        placeholder="Password*"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputContainer}
      /> */}
      <PrimaryButton
        title="Login"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title={"New User? Register Now"}
        type="clear"
        containerStyle={styles.registerText}
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
