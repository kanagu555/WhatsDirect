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

export default function App() {
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <MainContent />
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
