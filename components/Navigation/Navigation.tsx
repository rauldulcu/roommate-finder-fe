import React, { useState } from "react";
import { Avatar, Header } from "@rneui/base";
import { NavigationProps } from "../../types";
import DrawerComponent from "../DrawerContent/DrawerContent";

const Navigation: React.FC<NavigationProps<"Home">> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header
        leftComponent={{
          icon: "add",
          color: "#000",
          onPress: () => {
            navigation.navigate("CreatePost");
          },
        }}
        centerComponent={{
          icon: "tune",
          color: "#000",
          onPress: () => {
            navigation.navigate("Filters");
          },
        }}
        rightComponent={
          <Avatar
            rounded
            source={{
              uri: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg",
            }}
            onPress={toggleDrawer}
          />
        }
        backgroundColor="#fff"
      />
      <DrawerComponent
        navigation={navigation}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default Navigation;
