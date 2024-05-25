import React from "react";
import { Avatar, Header } from "@rneui/base";

const Navigation: React.FC = () => {
  return (
    <Header
      leftComponent={{
        icon: "add",
        color: "#000",
      }}
      centerComponent={{
        icon: "tune",
        color: "#000",
      }}
      rightComponent={
        <Avatar
          rounded
          source={{
            uri: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
          }}
        />
      }
      backgroundColor="#fff"
    />
  );
};

export default Navigation;
