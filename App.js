import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SplashScreen from "./components/SplashScreen";
import { useEffect, useState } from "react";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={styles.container}>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <>
            <StatusBar style="auto" />
            <Header />
            <MainContent />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#128c7e",
    paddingTop: "10%",
  },
});
