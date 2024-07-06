import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import { styles } from "./styles";

type FilterTagType = {
  label: string;
  value: string;
  icon?: string;
  selected: boolean;
  onSelect: (value: string) => void;
};

const FilterTag: React.FC<FilterTagType> = ({
  label,
  value,
  icon,
  selected,
  onSelect,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, selected ? styles.selected : styles.notSelected]}
        onPress={() => {
          onSelect(value);
        }}
      >
        {icon && <Icon name={icon} />}
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterTag;
