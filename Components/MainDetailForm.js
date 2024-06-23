import { View, Text, Linking, TouchableOpacity } from "react-native";
import React from "react";

const MainDetailForm = ({ data }) => {
  const handlePhonePress = () => {
    const phoneNumber = data?.phoneNumber?.replace(/\D/g, ""); // Remove non-numeric characters
    const phoneURL = `tel://17819275600`;
    Linking.openURL(phoneURL);
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePhonePress}>
        <Text>hey</Text>
      </TouchableOpacity>
      <View>
        <Text style={{ fontFamily: "Raleway", color: "black" }}>
          Ambulance:
        </Text>
        <Text>{data?.ambulance}</Text>
      </View>
      <View>
        <Text style={{ fontFamily: "Raleway", color: "black" }}>Fire:</Text>
        <Text>{data?.fire}</Text>
      </View>
      <View>
        <Text>Police:</Text>
        <Text>{data?.police}</Text>
      </View>
      <View>
        <Text>dispatch:</Text>
        <Text>{data?.dispatch}</Text>
      </View>
    </View>
  );
};

export default MainDetailForm;
