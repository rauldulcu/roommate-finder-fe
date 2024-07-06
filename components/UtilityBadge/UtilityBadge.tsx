import React from "react";
import { BadgeProps } from "@rneui/themed";
import { View, Text } from "react-native";
import { Icon } from "@rneui/base";
import { styles } from "./styles";

interface UtilityBadgeProps extends BadgeProps {
  iconName: string;
}

const UtilityBadge: React.FC<UtilityBadgeProps> = ({
  iconName,
  value,
  ...props
}) => {
  return (
    <View style={styles.badgeContainer}>
      <Icon name={iconName} size={16} color="black" />
      <Text style={styles.badgeText}>{value}</Text>
    </View>
  );
};

export default UtilityBadge;
