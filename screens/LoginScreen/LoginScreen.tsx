import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "@rneui/themed";
import { PrimaryButton } from "../../components";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import { NavigationProps } from "../../types";

const LoginScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/welcomeIcon.png")} // Replace with your local image path
        style={styles.logo}
      />
      <Text h3 style={styles.loginTitle}>
        Login
      </Text>
      <PrimaryInput
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
      />
      <PrimaryButton
        title="Login"
        onPress={() => navigation.navigate("Home")}
      />
      <TouchableOpacity>
        <Button
          title={"New User? Register Now"}
          type="clear"
          containerStyle={styles.registerText}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  loginTitle: {
    marginVertical: 25,
  },
  inputContainer: {
    borderRadius: 16,
  },
  loginButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
  },
  orText: {
    fontSize: 14,
    color: "grey",
    marginVertical: 10,
  },
  registerText: {
    color: "blue",
    marginTop: 100,
  },
});

export default LoginScreen;
