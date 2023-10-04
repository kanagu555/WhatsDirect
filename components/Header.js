import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.titleText}>WhatsDirect</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#9FE2BF",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: 'Cochin',
    fontSize: 35
  }
});
