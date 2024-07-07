import React, { useState } from "react";
import { Avatar, Header } from "@rneui/base";
import DrawerComponent from "../DrawerContent/DrawerContent";
import { useGetUserById } from "../../hooks/users/useGetUserById";
import { useUser } from "../../context/UserContext/UserContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../App";

const Navigation: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const { loggedUser } = useUser();
  const { user } = useGetUserById(loggedUser!.id);

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
              uri:
                user?.avatarURL ||
                "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
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
