import React from "react";
import { Badge, BadgeProps } from "@rneui/themed";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "@rneui/base";

// Extending BadgeProps to include an icon name and optionally overriding existing properties
interface UtilityBadgeProps extends BadgeProps {
  iconName: string; // Add iconName to props
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

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    margin: 8, // Adds spacing between badges if used in a list
  },
  badgeText: {
    fontSize: 16,
    color: "black",
    marginLeft: 5, // Space between icon and text
  },
});

export default UtilityBadge;
