import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Linking,
  ToastAndroid,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const WhatsForm = () => {
  const numRegex = /[^0-9]/g;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const handlePhoneNumber = (number) => {
    const replacedNum = number.replace(numRegex, "");
    setPhoneNumber(replacedNum);
  };

  const handleTextMessage = (message) => {
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

  const handleDebounceSendChat = (handleBtnFun, time) => {
    let timeOutId;
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        handleBtnFun();
      }, time);
    };
  };

  const fetchCopiedText = async (isChecked) => {
    const number = await Clipboard.getStringAsync();
    const copiedNum = number.replace(numRegex, "");
    setPhoneNumber(isChecked ? copiedNum : "");
    isChecked && Keyboard.dismiss();
    setIsSelected(!isSelected);
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
        autoComplete="off"
      />
      <View style={styles.checkBoxContainer}>
        <BouncyCheckbox
          text="Paste number from clipboard"
          isChecked={isSelected}
          size={23}
          fillColor="#128c7e"
          textStyle={{
            textDecorationLine: "none",
            color: "black",
          }}
          iconStyle={{
            borderRadius: 4,
          }}
          innerIconStyle={{
            borderRadius: 4,
            borderWidth: 2,
          }}
          onPress={fetchCopiedText}
        />
      </View>
      <Text style={styles.inputTitle}>Message</Text>
      <TextInput
        style={[styles.textInput, styles.multilineTextInput]}
        placeholder="Enter text message"
        onChangeText={handleTextMessage}
        multiline
      />
      <View style={styles.buttonStyle}>
        <Ionicons.Button
          text="text"
          name="send"
          size={25}
          color="white"
          backgroundColor="#128c7e"
          onPress={handleDebounceSendChat(handleSendChat, 200)}
        >
          <Text style={styles.buttonTitle}>START CHAT</Text>
        </Ionicons.Button>
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
  inputTitle: {
    marginBottom: 10,
  },
  textInput: {
    borderBottomWidth: 2,
    height: 40,
    fontSize: 20,
    marginBottom: 20,
  },
  multilineTextInput: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonStyle: {
    marginTop: 15,
    alignSelf: "flex-end",
  },
  checkBoxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkBoxText: {
    marginLeft: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WhatsForm;
