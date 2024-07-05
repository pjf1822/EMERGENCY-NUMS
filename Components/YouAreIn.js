import { View, Text } from "react-native";
import React from "react";
import { mainColors, regFont } from "../theme";

const YouAreIn = ({ country }) => {
  console.log(country);
  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: regFont.mainFont,
          color: mainColors.niceBlue,
          fontSize: 24,
          textAlign: "center",
        }}
      >
        YOU ARE IN
      </Text>
      <Text
        style={{
          fontFamily: regFont.mainFont,
          color: mainColors.gray,
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {country}
      </Text>
    </View>
  );
};

export default YouAreIn;
