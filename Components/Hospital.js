import { View, Text, FlatList } from "react-native";
import React from "react";
import { useFetchHospitals } from "../api";
import { mainColors, regFont } from "../theme";
import { calculateDistance } from "../helpers";

const Hospital = ({ coords }) => {
  const { data } = useFetchHospitals(coords);

  return (
    <View>
      <Text
        style={{
          fontFamily: regFont.mainFont,
          color: mainColors.normalBlue,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Hospitals closest to you
      </Text>
      <FlatList
        data={data?.results}
        keyExtractor={(item) => item?.reference}
        renderItem={({ item }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderBottomWidth: "2px",
              borderBottomColor: mainColors.gray,
            }}
          >
            <Text
              style={{
                fontFamily: regFont.mainFont,
                color: mainColors.niceBlue,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {item?.name}
            </Text>
            <Text>
              {calculateDistance(
                coords.latitude,
                coords.longitude,
                item.geometry.location.lat,
                item.geometry.location.lng
              )}{" "}
              kms away
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Hospital;
