import { Image, StyleSheet, View, ImageBackground } from "react-native";
const splash = require("../assets/splash.png");

const SplashScreen = () => {
  return <ImageBackground source={splash} style={styles.image} />;
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
