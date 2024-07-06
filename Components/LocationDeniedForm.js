import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import { mainColors, regFont } from "../theme";

const LocationDeniedForm = () => {
  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openSettings();
    } else if (Platform.OS === "android") {
      Linking.openSettings();
    }
  };

  return (
    <View
      style={{
        backgroundColor: mainColors.darkBlue,
        flex: 1,
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/loogo.png")}
        style={{
          height: 330,
          width: 330,
          objectFit: "contain",
        }}
      />
      <TouchableOpacity onPress={openSettings}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: regFont.mainFont,
            color: mainColors.niceBlue,
            textAlign: "center",
          }}
        >
          Allow Location and Refresh App
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationDeniedForm;
