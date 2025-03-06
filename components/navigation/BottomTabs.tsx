import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import MainScreen from "../MainScreen"
// import ExploreScreen from "../screens/ExploreScreen"

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
  console.log("Rendering BottomTabs")

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#25D366",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#eee",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="DirectMessage"
        component={MainScreen}
        options={{
          tabBarLabel: "Direct Message",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-text" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={MainScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

