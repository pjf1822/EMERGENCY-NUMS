import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavWrapper } from "./Navigation/NavWrapper";
import { useEffect, useRef, useState } from "react";
import * as Font from "expo-font";
import NavBar from "./Components/NavBar";
import { mainColors } from "./theme";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Raleway: require("./assets/HindSiliguri-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View
        style={{
          height: "100%",
          flex: 1,
          backgroundColor: mainColors.darkBlue,
        }}
      ></View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <RootSiblingParent>
          <NavigationContainer>
            <NavBar />
            <View
              style={{ height: 300, backgroundColor: mainColors.darkBlue }}
            ></View>
            <NavWrapper />
            <Text>working</Text>
            <Text>working</Text>
          </NavigationContainer>
        </RootSiblingParent>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
