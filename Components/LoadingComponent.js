import { View, ActivityIndicator, Image } from "react-native";
import React from "react";
import { mainColors } from "../theme";

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
    </View>
  );
};

export default LoadingComponent;
