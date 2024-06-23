import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";
import Drawer from "react-native-side-drawer";
import { NavigationProp } from "@react-navigation/native";

type DrawerProps = {
  navigation: NavigationProp<any>;
  isOpen: boolean;
  toggleDrawer: () => void;
};

const DrawerComponent: React.FC<DrawerProps> = ({
  navigation,
  isOpen,
  toggleDrawer,
}) => {
  const drawerContent = () => (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
        <Icon name="close" type="material" color="#000" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
          toggleDrawer();
        }}
      >
        <Text style={styles.drawerItem}>View Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Saved");
          toggleDrawer();
        }}
      >
        <Text style={styles.drawerItem}>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleDrawer();
        }}
      >
        <Text style={styles.drawerItem}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Drawer
      open={isOpen}
      drawerContent={drawerContent()}
      animationTime={250}
      overlay={true}
      drawerPercentage={50}
      opacity={0.4}
      position="right"
    />
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    height: "120%",
    padding: 20,
    marginTop: 75,
    backgroundColor: "white",
    marginBottom: -50,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 10,
    color: "black",
  },
});

export default DrawerComponent;
