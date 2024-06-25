import { View, Text, Linking, TouchableOpacity } from "react-native";
import React from "react";
import { mainColors } from "../theme";
import FormEntry from "./FormEntry";

const MainDetailForm = ({ data }) => {
  const handlePhonePress = () => {
    const phoneNumber = data?.phoneNumber?.replace(/\D/g, ""); // Remove non-numeric characters
    const phoneURL = `tel://17819275600`;
    Linking.openURL(phoneURL);
  };

  return (
    <View
      style={{
        borderWidth: 4,
        borderColor: mainColors.niceBlue,
        paddingLeft: 10,
        borderRadius: 10,
        width: "60%",
      }}
    >
      <FormEntry
        number={data.ambulance}
        title={"Ambulance"}
        underline={"yes"}
      />
      <FormEntry number={data.fire} title={"Fire"} underline={"yes"} />
      <FormEntry number={data.police} title={"Police"} underline={"yes"} />
      <FormEntry number={data.dispatch} title={"Dispatch"} underline={"no"} />
    </View>
  );
};

export default MainDetailForm;
