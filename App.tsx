import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BackHandler, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { toastConfig } from "./utils/toastConfig";
import MainScreen from "./components/MainScreen";
// import BottomTabs from "./components/navigation/BottomTabs";
// import Test from "./components/Test";

export default function App() {
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      if (Platform.OS === "android") {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }

        setBackPressedOnce(true);
        Toast.show({
          type: "info",
          text1: "Press again to exit",
          position: "bottom",
          visibilityTime: 2000,
        });

        // Reset back pressed state after 2 seconds
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [backPressedOnce]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#ffffff" />
        <MainScreen />
        {/* <BottomTabs /> */}
        <Toast config={toastConfig} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
