import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

const WhatsForm = () => {
  return (
    <View>
      <Text>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Phone Number"
        keyboardType="numeric"
        secureTextEntry={false}
      />
      <View style={styles.buttonStyle}>
        <Button color={"#128c7e"} title="Start chat" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    marginLeft: -8,
  },
  boxStyles: {
    borderWidth: 0,
  },
  textInput: {
    borderBottomWidth: 2,
    height: 40,
    fontSize: 20,
  },
  buttonStyle: {
    marginTop: 15,
    alignSelf: "flex-end",
  },
});

export default WhatsForm;
