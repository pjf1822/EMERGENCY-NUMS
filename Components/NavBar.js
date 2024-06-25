import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { mainColors } from "../theme";

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 80,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: mainColors.gray,
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity
        style={{ paddingRight: 10 }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Feather
          name="settings"
          size={24}
          color={mainColors.normalBlue}
          // backgroundColor="green"
          paddingRight="10px"
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
