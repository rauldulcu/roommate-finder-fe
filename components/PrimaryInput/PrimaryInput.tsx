import React from "react";
import { Input } from "@rneui/themed";
import { KeyboardTypeOptions, TextInputProps } from "react-native";
import { Icon } from "@rneui/base";
import { styles } from "./styles";

interface PrimaryInputProps {
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder: string;
  numOfLines?: number;
  rightIcon?: string;
  leftIcon?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  value,
  onChange,
  placeholder,
  numOfLines,
  rightIcon,
  leftIcon,
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
      // onChange={(event) => onChange(event.nativeEvent.text)}
      onChangeText={onChange}
      multiline={true}
      numberOfLines={numOfLines}
      rightIcon={rightIcon ? <Icon name={rightIcon} /> : undefined}
      leftIcon={leftIcon ? <Icon name={leftIcon} /> : undefined}
      keyboardType={keyboardType ? keyboardType : undefined}
    />
  );
};

export default PrimaryInput;
