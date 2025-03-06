import { StyleSheet, View, Text } from "react-native"
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.iconBackground}>
          <MaterialCommunityIcons name="message-text" size={24} color="#fff" />
        </View>
        <Text style={styles.title}>WhatsApp Direct</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <FontAwesome name="users" size={14} color="#666" style={styles.subtitleIcon} />
        <Text style={styles.subtitle}>Send messages without saving contacts</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconBackground: {
    backgroundColor: "#25D366",
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleIcon: {
    marginRight: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
})

