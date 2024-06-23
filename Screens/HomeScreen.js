import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useFetchCountryDetails, useGetCountryCode } from "../api";
import MainDetailForm from "../Components/MainDetailForm";
import * as Location from "expo-location";

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
    <View>
      <Text>YOU ARE IN </Text>
      <Text>{country}</Text>
      <MainDetailForm data={countryNumbersObject} />
    </View>
  );
};

export default HomeScreen;
