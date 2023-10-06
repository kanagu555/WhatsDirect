import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>WhatsDirect</Text>
      <TouchableOpacity>
        <SimpleLineIcons
          name="options-vertical"
          size={25}
          color="black"
          style={styles.optionIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#128c7e",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 12,
  },
  optionIcon: {
    marginRight: 15,
  },
});
