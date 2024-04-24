import React from "react";
import { Avatar, Header } from "@rneui/base";

const Navigation: React.FC = () => {
  return (
    <Header
      leftComponent={{
        icon: "menu",
        color: "#000",
      }}
      centerComponent={{
        icon: "search",
        color: "#000",
      }}
      rightComponent={
        <Avatar
          rounded
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          }}
        />
      }
      backgroundColor="#fff"
    />
  );
};

export default Navigation;
