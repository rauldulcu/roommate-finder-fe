import React from "react";
import { Input, InputProps } from "@rneui/themed";
import { StyleSheet } from "react-native";

const PrimaryInput: React.FC<InputProps> = ({ ...props }) => {
  return (
    <Input
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      leftIconContainerStyle={styles.iconStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10, // Adjust as needed
  },
  inputContainerStyle: {
    borderRadius: 30, // This will make the edges rounded
    borderWidth: 1, // Set the border width
    borderColor: "grey", // Set the border color
  },
  inputStyle: {
    padding: 10,
  },
  iconStyle: {
    padding: 10,
  },
});

export default PrimaryInput;
