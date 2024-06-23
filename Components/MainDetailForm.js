import { View, Text } from "react-native";
import React from "react";

const MainDetailForm = ({ data }) => {
  return (
    <View>
      <View>
        <Text>Ambulance:</Text>
        <Text>{data?.ambulance}</Text>
      </View>
      <View>
        <Text>Fire:</Text>
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
