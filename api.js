import { useQuery } from "react-query";
import { GEOCODE_API_KEY, GOOGLE_API_KEY } from "@env";

export const useGetCountryCode = (
  latitude,
  longitude,
  setCountryCode,
  setCountry
) => {
  return useQuery(
    ["countryCode", { latitude, longitude }],
    async () => {
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEOCODE_API_KEY}`;

      const res = await fetch(apiUrl);
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Could not get country code");
      }
      return res.json();
    },
    {
      enabled: !!latitude && !!longitude,
      onSuccess: (data) => {
        setCountry(data?.results[0].components.country);
        setCountryCode(data?.results[0].components["ISO_3166-1_alpha-2"]);
      },
      onError: (error) => {
        console.error("Error fetching country code:", error);
      },
    }
  );
};
export const useFetchCountryDetails = (
  countryCode,
  setCountryNumbersObject,
  setIsLoading
) => {
  return useQuery(
    ["countryNumbers", { countryCode }],
    async () => {
      const apiUrl = `https://emergencynumberapi.com/api/country/${countryCode}`;

      const res = await fetch(`${apiUrl}`);

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || "Failed to fetch emergency numbers"
        );
      }
      return res.json();
    },
    {
      enabled: !!countryCode,
      onSuccess: (data) => {
        setCountryNumbersObject({
          ambulance: data?.data?.ambulance?.all[0],
          dispatch: data?.data?.dispatch?.all[0],
          fire: data?.data?.police?.all[0],
          police: data?.data?.police?.all[0],
        });
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Error fetching emergency numbers:", error);
      },
    }
  );
};

export const useFetchHospitals = (coords) => {
  return useQuery(
    ["hospitals", { coords }],
    async () => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords?.latitude.toFixed(
        4
      )},${coords?.longitude.toFixed(
        4
      )}&radius=50000&type=hospital&key=${GOOGLE_API_KEY}`;
      const res = await fetch(`${url}`);

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || "Failed to fetch hosptial data"
        );
      }
      return res.json();
    },
    {
      enabled: !!coords.latitude,
      onSuccess: (data) => {
        // console.log("we ran", data?.results);
      },
      onError: (error) => {
        console.error("Error fetching emergency numbers:", error);
      },
    }
  );
};
