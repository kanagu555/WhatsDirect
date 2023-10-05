import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>WhatsDirect</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#128c7e",
    height: "12%",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 12,
  },
});
