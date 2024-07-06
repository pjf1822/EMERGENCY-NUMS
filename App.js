import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { mainColors } from "./theme";
import HomeScreen from "./Screens/HomeScreen";

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
      >
        <Text></Text>
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <RootSiblingParent>
          <HomeScreen />
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
