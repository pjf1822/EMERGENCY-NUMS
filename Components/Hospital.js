import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { useFetchHospitals } from "../api";
import { mainColors, regFont } from "../theme";
import { calculateDistance } from "../helpers";

const Hospital = ({ coords, countryCode }) => {
  const { data } = useFetchHospitals(coords);

  const filteredData = data?.results.filter(
    (item) =>
      !item.name.toLowerCase().includes("dermatology") &&
      !item.name.toLowerCase().includes("rehabilitation") &&
      !item.name.toLowerCase().includes("phd")
  );
  const openInMaps = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item, index }) => {
    const isLastItem = index === data?.results.length - 1;

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 8,
          paddingBottom: 8,
          borderBottomWidth: isLastItem ? 0 : 2, // Conditionally remove bottom border
          borderBottomColor: mainColors.normalBlue,
        }}
      >
        <TouchableOpacity
          style={{ maxWidth: "65%" }}
          onPress={() => openInMaps(item?.vicinity)}
        >
          <Text
            style={{
              fontFamily: regFont.mainFont,
              color: mainColors.niceBlue,
              fontSize: 19,
              fontWeight: "600",
            }}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: regFont.mainFont,
            color: mainColors.niceBlue,
            fontSize: 19,
            fontWeight: "600",
          }}
        >
          {calculateDistance(
            coords?.latitude,
            coords?.longitude,
            item?.geometry?.location?.lat,
            item?.geometry?.location?.lng,
            countryCode
          )}{" "}
          {countryCode === "US" ? "miles away" : "kms away"}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ width: "90%", paddingTop: 20, flex: 1 }}>
      <Text
        style={{
          fontFamily: regFont.mainFont,
          color: mainColors.niceBlue,
          fontSize: 28,
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Hospitals Near You
      </Text>
      <View
        style={{
          height: 7,
          backgroundColor: mainColors.normalBlue,
          width: "100%",
          borderRadius: 10,
          marginBottom: 3,
        }}
      ></View>

      <FlatList
        data={filteredData}
        style={{ maxHeight: "100%" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.reference}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Hospital;
