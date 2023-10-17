import { StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";

const WhatsForm = () => {
  return (
    <View>
      <Text>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Phone Number"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
    height: 40,
    fontSize: 20,
  },
});

export default WhatsForm;
