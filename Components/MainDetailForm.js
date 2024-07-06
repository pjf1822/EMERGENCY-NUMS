import { View, Text, Linking, TouchableOpacity } from "react-native";
import React from "react";
import { mainColors } from "../theme";
import FormEntry from "./FormEntry";

const MainDetailForm = ({ data }) => {
  const handlePhonePress = (value) => {
    // return;
    const phoneNumber = data?.phoneNumber?.replace(/\D/g, ""); // Remove non-numeric characters
    const phoneURL = `tel://${value}`;
    Linking.openURL(phoneURL);
  };
  const filteredEntries = Object.entries(data).filter(([key, value]) => value);

  return (
    <View
      style={{
        borderWidth: 4,
        borderColor: mainColors.niceBlue,
        paddingLeft: 10,
        borderRadius: 10,
        width: "100%",
      }}
    >
      {filteredEntries.map(([key, value], index) => {
        const capitalizedTitle = key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <TouchableOpacity key={key} onPress={() => handlePhonePress(value)}>
            <FormEntry
              key={value}
              number={value}
              title={capitalizedTitle}
              underline={index !== filteredEntries.length - 1 ? "yes" : "no"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MainDetailForm;
