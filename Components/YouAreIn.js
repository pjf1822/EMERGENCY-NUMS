import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { mainColors, regFont } from "../theme";

const YouAreIn = ({ country, isLoading }) => {
  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        // flex: 1,
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
        YOU ARE IN:
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#29648A" />
      ) : (
        <Text
          style={{
            fontFamily: regFont.mainFont,
            color: mainColors.gray,
            textAlign: "center",
            fontSize: 24,
          }}
        >
          {country}
        </Text>
      )}
    </View>
  );
};

export default YouAreIn;
