"use client";

import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import Header from "./Header";
import { countryCodes } from "../utils/countryCodes";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

interface CountryCodeItem {
  label: string;
  value: string;
  country: string;
  dialCode: string;
}

export default function MainScreen() {
  console.log("Rendering MainScreen");

  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+91"); // Default to India
  const [selectedCountry, setSelectedCountry] = useState("in"); // Default to India
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<CountryCodeItem[]>(countryCodes);
  const [usePastedNumber, setUsePastedNumber] = useState(false);
  const [clipboardContent, setClipboardContent] = useState("");

  const phoneInputRef = useRef<TextInput>(null);

  // Get clipboard content when checkbox is checked
  useEffect(() => {
    if (usePastedNumber) {
      const getClipboardContent = async () => {
        try {
          const content = await Clipboard.getStringAsync();
          // Simple regex to extract numbers only
          const numbersOnly = content.replace(/\D/g, "");
          setClipboardContent(numbersOnly);
          setPhoneNumber(numbersOnly);
        } catch (error) {
          console.error("Failed to get clipboard content", error);
          Toast.show({
            type: "error",
            text1: "Clipboard Error",
            text2: "Could not access clipboard content",
          });
        }
      };

      getClipboardContent();
    }
  }, [usePastedNumber]);

  // Handle country selection
  const handleCountrySelect = (item: CountryCodeItem) => {
    try {
      setCountryCode(item.dialCode); // Use dialCode instead of value
      setSelectedCountry(item.country);
    } catch (error) {
      console.error("Error in handleCountrySelect:", error);
      Alert.alert("Error", "Failed to select country code");
    }
  };

  const handleSendChat = () => {
    try {
      // Validate inputs
      if (!phoneNumber.trim()) {
        Toast.show({
          type: "error",
          text1: "Phone number required",
          text2: "Please enter a valid phone number",
        });
        return;
      }

      // Remove any non-numeric characters from the phone number
      const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");

      // Construct the WhatsApp URL
    //   const whatsappUrl = `whatsapp://send?phone=${countryCode}${cleanPhoneNumber}&text=${encodeURIComponent(
    //     message
    //   )}`;

      const whatsappUrl = `https://api.whatsapp.com/send/?phone=${countryCode}${cleanPhoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      console.log('whatsappUrl:', whatsappUrl)
      // Open WhatsApp
      Linking.canOpenURL(whatsappUrl)
        .then((supported) => {
            console.log('supported:', supported)
          if (supported) {
            return Linking.openURL(whatsappUrl);
          } else {
            Toast.show({
              type: "error",
              text1: "WhatsApp not installed",
              text2: "Please install WhatsApp to use this feature",
            });
          }
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Could not open WhatsApp",
          });
          console.error("An error occurred", err);
        });
    } catch (error) {
      console.error("Error in handleSendChat:", error);
      Alert.alert("Error", "Failed to send WhatsApp message");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        if (open) setOpen(false);
      }}
    >
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <Header />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Enter Contact Details</Text>

            <Text style={styles.label}>Country Code</Text>
            <DropDownPicker
              open={open}
              value={countryCode}
              items={items}
              setOpen={setOpen}
              setValue={setCountryCode}
              setItems={setItems}
              searchable={true}
              searchPlaceholder="Search country code..."
              placeholder="Select country code"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              closeOnBackPressed={true}
              closeAfterSelecting={true}
              onSelectItem={(item) =>
                handleCountrySelect(item as CountryCodeItem)
              }
              zIndex={3000}
              zIndexInverse={1000}
            />

            <Text style={[styles.label, { marginTop: open ? 120 : 20 }]}>
              Phone Number
            </Text>
            <View style={styles.inputContainer}>
              <FontAwesome
                name="phone"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                ref={phoneInputRef}
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setUsePastedNumber(!usePastedNumber)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  usePastedNumber && styles.checkboxChecked,
                ]}
              >
                {usePastedNumber && (
                  <Feather name="check" size={14} color="#fff" />
                )}
              </View>
              <View style={styles.checkboxLabelContainer}>
                <Text style={styles.checkboxLabel}>Use clipboard number</Text>
                <FontAwesome
                  name="clipboard"
                  size={16}
                  color="#666"
                  style={styles.clipboardIcon}
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.label}>Message (Optional)</Text>
            <View style={styles.messageInputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Type your message here..."
                multiline
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSendChat}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="send"
                size={18}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Send WhatsApp Message</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 100 : 80, // Add extra padding at the bottom for iOS
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    marginBottom: 12,
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  messageInputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  messageInput: {
    padding: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#25D366",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#25D366",
  },
  checkboxLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#666",
  },
  clipboardIcon: {
    marginLeft: 6,
  },
  button: {
    backgroundColor: "#25D366", // WhatsApp green
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
