import { View, Text, Image, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useFetchCountryDetails, useGetCountryCode } from "../api";
import MainDetailForm from "../Components/MainDetailForm";
import * as Location from "expo-location";
import { mainColors, regFont } from "../theme";
import Hospital from "../Components/Hospital";
import YouAreIn from "../Components/YouAreIn";
import LocationDeniedForm from "../Components/LocationDeniedForm";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [countryCode, setCountryCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);
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
        setIsLoading(false);
        setLocationDenied(true);
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setLocationDenied(false);
      let location = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    };
    getLocation();
  }, []);

  const {} = useGetCountryCode(
    coords.latitude,
    coords.longitude,
    setCountryCode,
    setCountry
  );

  const {} = useFetchCountryDetails(
    countryCode,
    setCountryNumbersObject,
    setIsLoading
  );

  if (locationDenied) {
    return <LocationDeniedForm />;
  }

  return (
    <View
      style={{
        backgroundColor: mainColors.darkBlue,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/loogo.png")}
        style={{
          height: Platform.isPad ? 200 : 160,
          width: Platform.isPad ? 180 : 130,
          marginTop: 50,
          objectFit: "contain",
        }}
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
        Lifeline Global
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <YouAreIn country={country} isLoading={isLoading} />
        <MainDetailForm data={countryNumbersObject} />
      </View>
      <Hospital
        coords={coords}
        countryCode={countryCode}
        isLoading={isLoading}
      />
      <View style={{ height: 40, backgroundColor: mainColors.darkBlue }}></View>
    </View>
  );
};

export default HomeScreen;
