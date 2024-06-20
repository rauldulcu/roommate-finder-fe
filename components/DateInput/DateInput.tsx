import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryInput from "../PrimaryInput"; // Assuming PrimaryInput passes through the value

type DateInputProps = {
  onChange: (text: string) => void;
  onBlur: () => void;
  value: string;
};

const DateInput: React.FC<DateInputProps> = ({ onChange, onBlur, value }) => {
  const handleOnChange = (text: string) => {
    let formattedText = text.replace(/[^0-9]/g, "");

    if (formattedText.length > 4) {
      formattedText =
        formattedText.slice(0, 2) +
        "/" +
        formattedText.slice(2, 4) +
        "/" +
        formattedText.slice(4);
    } else if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
    }

    formattedText = formattedText.slice(0, 10);

    if (value && text.length < value.length) {
      if (
        value[value.length - 1] === "/" &&
        (formattedText.match(/\//g) || []).length <
          (value.match(/\//g) || []).length
      ) {
        formattedText = formattedText.replace(
          /^(0?[1-9]|[12][0-9]|3[01])$/,
          "$1/"
        );
        formattedText = formattedText.replace(
          /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])$/,
          "$1/$2/"
        );
      }
    }

    onChange(formattedText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <PrimaryInput
          onChange={handleOnChange}
          value={value}
          placeholder="DD/MM/YYYY"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default DateInput;
