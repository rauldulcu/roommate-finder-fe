import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "@rneui/base";
import Drawer from "react-native-side-drawer";
import { NavigationProp } from "@react-navigation/native";
import { useGetApartmentByOwnerId } from "../../hooks/apartments/useGetApartmentByOwnerId";
import { styles } from "./styles";
import { useUser } from "../../context/UserContext/UserContext";
import { useFilters } from "../../context/FiltersContext/FiltersContext";
import { useGetApartments } from "../../hooks/apartments/useGetApartments";

type DrawerProps = {
  navigation: NavigationProp<any>;
  isOpen: boolean;
  toggleDrawer: () => void;
};

const DrawerComponent: React.FC<DrawerProps> = ({
  navigation,
  isOpen = false,
  toggleDrawer = () => {},
}) => {
  const { clearFilters } = useFilters();
  const { loggedUser, handleLogout } = useUser();
  const { apartment, refetch } = useGetApartmentByOwnerId(loggedUser!.id);
  const { apartments } = useGetApartments();

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  const drawerContent = () => (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
        <Icon name="close" type="material" color="#000" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
          toggleDrawer();
          refetch();
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

      {apartment && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ApartmentInfo", { apartmentId: apartment.id });
            toggleDrawer();
          }}
        >
          <Text style={styles.drawerItem}>Your Apartment</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          toggleDrawer();
          handleLogout();
          clearFilters();
          navigation.navigate("Login");
        }}
        style={{ position: "relative", top: 480 }}
      >
        <Text
          style={{
            fontSize: 18,
            marginVertical: 10,
            color: "black",
          }}
        >
          Log Out
        </Text>
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

export default DrawerComponent;
