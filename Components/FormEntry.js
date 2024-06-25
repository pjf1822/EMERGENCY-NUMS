import { View, Text } from "react-native";
import React from "react";
import { mainColors, regFont } from "../theme";

const FormEntry = ({ number, title, underline }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        borderBottomWidth: underline === "yes" ? 2 : 0,
        borderBottomColor: mainColors.niceBlue,
      }}
    >
      <Text
        style={{
          fontFamily: regFont.mainFont,
          color: mainColors.niceBlue,
          fontSize: 19,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: regFont.mainFont,
          color: mainColors.niceBlue,
          fontSize: 19,
          fontWeight: "600",
        }}
      >
        {number}
      </Text>
    </View>
  );
};

export default FormEntry;
