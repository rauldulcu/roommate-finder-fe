import React from "react";
import { Input, InputProps } from "@rneui/themed";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";

interface PrimaryInputProps {
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder: string;
  numOfLines?: number;
  rightIcon?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  value,
  onChange,
  placeholder,
  numOfLines,
  rightIcon,
  keyboardType,
}) => {
  return (
    <Input
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      leftIconContainerStyle={styles.iconStyle}
      labelStyle={{ marginLeft: 15 }}
      placeholder={placeholder}
      value={value as string}
      onChange={(event) => onChange(event.nativeEvent.text)}
      multiline={true}
      numberOfLines={numOfLines}
      rightIcon={rightIcon ? <Icon name={rightIcon} /> : undefined}
      keyboardType={keyboardType ? keyboardType : undefined}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  inputContainerStyle: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "grey",
  },
  inputStyle: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  iconStyle: {
    padding: 10,
  },
});

export default PrimaryInput;
