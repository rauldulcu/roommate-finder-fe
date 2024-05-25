import React from "react";
import { Badge, BadgeProps } from "@rneui/themed";
import { StyleSheet } from "react-native";

const UtilityBadge: React.FC<BadgeProps> = ({ ...props }) => {
  return (
    <Badge
      {...props}
      badgeStyle={styles.badgeStyle}
      textStyle={styles.textStyle}
      containerStyle={styles.containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  badgeStyle: {
    backgroundColor: "#0077B6", // Example color
    paddingHorizontal: 10, // Horizontal padding to add space inside the badge
    borderRadius: 12,
    height: 25 // Increasing the border radius for a more rounded look
  },
  textStyle: {
    fontSize: 12, // Adjust the font size as needed
  },
  containerStyle: {
    margin: 5, // Adds space around the badge if it's within a view with other items
  },
});

export default UtilityBadge;
