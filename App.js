import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import Home from "./screens/Home";
import Leader_Board from "./screens/Leader_Board";
import Settings from "./screens/Settings";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import Add_Expense from "./screens/Add_Expense";
import { useNavigation } from "@react-navigation/native";

import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// Custom circular button component
const CircularButton = () => {
  const [modalVisible, setModalVisible] = useState("false");

  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Add"); // Navigate to the "Add" screen
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinearGradient
        colors={["#FF69B4", "#8A2BE2"]}
        style={styles.circularButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Entypo name="plus" size={35} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function App() {
  const [colour, setColour] = useState("grey");

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              elevation: 10,
              backgroundColor: "white", // Change the background color if needed
              height: 60,
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                const iconName = focused ? "black" : colour;
                return (
                  <View>
                    <Entypo name="home" size={24} color={iconName} />
                  </View>
                );
              },
            })}
          />

          <Tab.Screen
            name="Add"
            component={Add_Expense}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <CircularButton
                    onPress={() => console.log("Add button pressed")}
                  />
                );
              },
            }}
          />

          <Tab.Screen
            name="Statistic"
            component={Leader_Board}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                const iconName = focused ? "black" : colour;
                return (
                  <View>
                    <Entypo name="bar-graph" size={24} color={iconName} />
                  </View>
                );
              },
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Set the background color of the entire screen
  },
  circularButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: 50,
    height: 50,
    top: -15,
  },
});
