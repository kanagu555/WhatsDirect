import { StyleSheet, Text, View, ImageBackground } from "react-native";
import WhatsForm from "./WhatsForm";
const bgImg = require("../assets/bgImg.jpg");

const MainContent = () => {
  return (
    <ImageBackground source={bgImg} style={styles.backgroundImage}>
      <View style={styles.card}>
        <WhatsForm />
      </View>
    </ImageBackground>
  );
};

export default MainContent;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    margin: 15,
  },
});
