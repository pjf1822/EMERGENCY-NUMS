import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { useFetchHospitals } from "../api";
import { mainColors, regFont } from "../theme";
import { calculateDistance } from "../helpers";

const Hospital = ({ coords, countryCode }) => {
  const { data } = useFetchHospitals(coords);

  console.log(countryCode, "the code", typeof countryCode);
  const openInMaps = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ width: "90%", paddingTop: 20, flex: 1 }}>
      <View
        style={{
          backgroundColor: mainColors.normalBlue,
          borderRadius: "50%",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: regFont.mainFont,
            color: mainColors.niceBlue,
            fontSize: 28,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Hospitals near you
        </Text>
      </View>

      <FlatList
        data={data?.results}
        style={{ maxHeight: "100%" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.reference}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: "2px",
              borderBottomColor: mainColors.gray,
              paddingTop: 8,
              paddingBottom: 8,
            }}
            onPress={() => openInMaps(item?.vicinity)}
          >
            <Text
              style={{
                fontFamily: regFont.mainFont,
                color: mainColors.niceBlue,
                fontSize: 19,
                fontWeight: "600",
                maxWidth: "65%",
              }}
            >
              {item?.name}
            </Text>
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Hospital;
