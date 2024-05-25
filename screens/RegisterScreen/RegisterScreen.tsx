import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { PrimaryButton, PrimaryInput } from "../../components";
import { NavigationProps } from "../../types";
import { styles } from "./styles";

const RegisterScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text h3 style={styles.loginTitle}>
        Tell us about yourself
      </Text>
      <PrimaryInput
        placeholder="Full Name*"
        keyboardType="email-address"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <PrimaryInput
        placeholder="Email Address*"
        keyboardType="email-address"
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputContainer}
      />
      <PrimaryInput placeholder="Date of Birth*" />
      <PrimaryInput
        placeholder="City"
        value="Cluj-Napoca"
        label="City**"
        disabled
      />
      <PrimaryInput label="Address*" />
      <PrimaryButton
        title="Next"
        onPress={() => navigation.navigate("Home")}
        containerStyle={{
          marginTop: 20,
          marginLeft: 225,
          width: 100,
          height: 40,
        }}
      />
      <Button
        title={"**Only available in Cluj-Napoca for now"}
        type="clear"
        disabled
        containerStyle={styles.registerText}
      />
    </View>
  );
};

export default RegisterScreen;
