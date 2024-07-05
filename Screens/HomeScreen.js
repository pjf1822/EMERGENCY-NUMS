import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useFetchCountryDetails, useGetCountryCode } from "../api";
import MainDetailForm from "../Components/MainDetailForm";
import * as Location from "expo-location";
import { mainColors, regFont } from "../theme";
import Hospital from "../Components/Hospital";
import YouAreIn from "../Components/YouAreIn";

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
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        GLOBAL EMERGENCY RESOURCES
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <YouAreIn country={country} />
        <MainDetailForm data={countryNumbersObject} />
      </View>
      <Hospital coords={coords} countryCode={countryCode} />
      <View style={{ height: 40, backgroundColor: mainColors.darkBlue }}></View>
    </View>
  );
};

export default HomeScreen;
