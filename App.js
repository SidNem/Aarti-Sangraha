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
import Exchange from "./screens/InputForm";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Awards from "./screens/Awards";

const Tab = createBottomTabNavigator();

// Custom circular button component
const CircularButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#FF69B4', '#8A2BE2']}
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
  const [colour, setColour] = useState('grey');

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarStyle: {
          borderRadius: 30, // Adjust the value to control the roundness
          backgroundColor: '#FFFF', // Change the background color if needed
          height: 60, // Adjust the height of the tab bar
        }
      })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              const iconName = focused ? 'black' : colour;
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
          component={Exchange}
          options={{
            tabBarIcon: ({ focused }) => {
              return <CircularButton onPress={() => console.log('Add button pressed')} />;
            },
          }}
        />

        <Tab.Screen
          name="Statistic"
          component={Leader_Board}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              const iconName = focused ? 'black' : colour;
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
  );
}

const styles = StyleSheet.create({
  circularButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
    top: -15,
  },
});
