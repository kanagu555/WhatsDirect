import { StyleSheet, Text, View } from "react-native";

const MainContent = () => {
  return (
    <View style={styles.mainContent}>
      <View style={styles.card}>
        <Text>WhatsDirect Card</Text>
      </View>
    </View>
  );
};

export default MainContent;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: "#FFFFDD",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    margin: 15,
  },
});