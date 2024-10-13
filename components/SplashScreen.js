import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
const splash = require("../assets/splash.png");

const SplashScreen = () => {
  return (
    <ImageBackground source={splash} style={styles.image}>
      <View style={styles.loading}>
        <ActivityIndicator size={45} color="#fff" />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  loading: {
    paddingTop: 500,
  },
});
