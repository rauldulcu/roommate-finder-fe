import React, { useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Button, Text } from "@rneui/themed";
import { PrimaryButton, PrimaryInput } from "../../components";
import { styles } from "./styles";
import { Controller, set, useForm } from "react-hook-form";
import { emailValidator } from "./validators/emailValidator";
import { passwordValidator } from "./validators/passwordValidator";
import { useLoginUser } from "../../hooks/users/useLoginUser";
import { Icon, Input } from "@rneui/base";
import { styles as inputStyle } from "../../components/PrimaryInput/styles";
import { useUser } from "../../context/UserContext/UserContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";

type LoginRequestType = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, loginError } = useLoginUser();
  const { refetchUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginRequestType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginRequestType) => {
    setEmailError(emailValidator(data.email));
    setPasswordError(passwordValidator(data.password));
    setLoading(true);
    login(
      { username: data.email, password: data.password },
      {
        onSuccess: async () => {
          await refetchUser();
          setLoading(false);
          navigation.navigate("Home");
        },
      }
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/welcomeIcon.png")}
        style={styles.logo}
      />
      <Text h3 style={styles.loginTitle}>
        Login
      </Text>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <PrimaryInput
            placeholder="Email address*"
            leftIcon={"email"}
            value={value}
            onChange={(inputValue) => onChange(inputValue)}
            keyboardType="email-address"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            containerStyle={inputStyle.inputContainer}
            inputContainerStyle={inputStyle.inputContainerStyle}
            inputStyle={inputStyle.inputStyle}
            leftIconContainerStyle={inputStyle.iconStyle}
            labelStyle={{ marginLeft: 15 }}
            placeholder="Password*"
            leftIcon={<Icon name="lock" />}
            value={value}
            onChangeText={(inputValue) => onChange(inputValue)}
            secureTextEntry={true}
          />
        )}
      />
      {loginError && (
        <Text style={{ color: "red", marginBottom: 15 }}>
          {loginError.message}
        </Text>
      )}
      <PrimaryButton
        title="Login"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
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
