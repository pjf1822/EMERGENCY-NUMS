import { View, ActivityIndicator, Image, Text } from "react-native";
import React from "react";
import { mainColors, regFont } from "../theme";

const LoadingComponent = () => {
  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        backgroundColor: mainColors.darkBlue,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/loogo.png")}
        style={{
          height: 390,
          width: 390,
          objectFit: "contain",
          marginTop: 37,
        }}
      />
      <ActivityIndicator size="large" color="#29648A" />
      <Text
        style={{
          fontSize: 23,
          fontFamily: regFont.mainFont,
          color: mainColors.niceBlue,
          textAlign: "center",
          marginTop: 19,
        }}
      >
        Grabbing Local Emergency Data
      </Text>
    </View>
  );
};

export default LoadingComponent;
