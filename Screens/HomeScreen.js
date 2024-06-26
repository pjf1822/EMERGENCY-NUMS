import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useFetchCountryDetails, useGetCountryCode } from "../api";
import MainDetailForm from "../Components/MainDetailForm";
import * as Location from "expo-location";
import { mainColors, regFont } from "../theme";
import Hospital from "../Components/Hospital";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [countryCode, setCountryCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [countryNumbersObject, setCountryNumbersObject] = useState({
    ambulance: "",
    dispatch: "",
    fire: "",
    police: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    };
    getLocation();
  }, []);

  const {
    data: countryCodeData,
    isSuccess: isCountryCodeSuccess,
    isError: isCountryCodeError,
    error: countryCodeError,
    status: countryCodeStatus,
  } = useGetCountryCode(
    coords.latitude,
    coords.longitude,
    setCountryCode,
    setCountry
  );

  const {
    data: countryNumbers,
    isSuccess: isCountryNumbersSuccess,
    isError: isCountryNumbersError,
    error: countryNumbersError,
    status: countryNumbersStatus,
  } = useFetchCountryDetails(
    countryCode,
    setCountryNumbersObject,
    setIsLoading
  );

  return (
    <View
      style={{
        backgroundColor: mainColors.darkBlue,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/logo-no-background-cropped-again.png")}
        style={{ height: 130, width: 130, marginTop: 40, objectFit: "contain" }}
      />
      <Text
        style={{
          fontSize: 40,
          fontFamily: regFont.mainFont,
          color: mainColors.niceBlue,
          marginBottom: 30,
        }}
      >
        SAFE TRAVELS
      </Text>
      <View
        style={{
          backgroundColor: mainColors.lighterBlue,
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 10,
          width: "80%",
          borderRadius: 10,
          marginBottom: 20,
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
            color: mainColors.niceBlue,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {country}
        </Text>
      </View>

      <MainDetailForm data={countryNumbersObject} />
      <Hospital coords={coords} />
    </View>
  );
};

export default HomeScreen;
