import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Linking,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { SelectList } from "react-native-dropdown-select-list";

const WhatsForm = () => {
  const numRegex = /[^0-9]/g;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [textMessage, setTextMessage] = useState("");

  const handlePhoneNumber = (number) => {
    const replacedNum = number.replace(numRegex, "");
    setPhoneNumber(replacedNum);
  };

  const handleTextMessage = (message) => {
    console.log(message);
    setTextMessage(message);
  };

  const handleSendChat = () => {
    if (!phoneNumber) {
      ToastAndroid.show("Please enter phone number", ToastAndroid.SHORT);
      return;
    }
    const URL = `https://api.whatsapp.com/send/?phone=91-${phoneNumber}&text=${textMessage}`;
    Linking.openURL(URL);
  };

  const fetchCopiedText = async () => {
    const number = await Clipboard.getStringAsync();
    const copiedNum = number.replace(numRegex, "");
    setPhoneNumber(copiedNum);
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
        <Button color={"#128c7e"} title="Start chat" onPress={handleSendChat} />
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
    marginBottom: 20,
  },
  buttonStyle: {
    marginTop: 15,
    alignSelf: "flex-end",
  },
});

export default WhatsForm;
