import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

const WhatsForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [textMessage, setTextMessage] = useState("");

  const handlePhoneNumber = (number) => {
    console.log(number);
    setPhoneNumber(number);
  };

  const handleTextMessage = (message) => {
    console.log(message);
    setTextMessage(message);
  };

  const handleSendChat = () => {
    const URL = `https://api.whatsapp.com/send/?phone=91-${phoneNumber}&text=${textMessage}`;
    Linking.openURL(URL);
  };

  return (
    <View>
      <Text>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter phone number"
        keyboardType="numeric"
        secureTextEntry={false}
        value={phoneNumber}
        onChangeText={handlePhoneNumber}
      />
      <Text>Enter Message</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text message"
        onChangeText={handleTextMessage}
      />
      <View style={styles.buttonStyle}>
        <Button
          color={"#128c7e"}
          title="Start chat"
          onPress={handleSendChat}
          disabled={phoneNumber.length ? false : true}
        />
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
    marginBottom: 10,
  },
  buttonStyle: {
    marginTop: 15,
    alignSelf: "flex-end",
  },
});

export default WhatsForm;
