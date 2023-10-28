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
import Chat from "./screens/Chat";
import Leader_Board from "./screens/Leader_Board";
import Settings from "./screens/Settings";
import Exchange from "./screens/InputForm";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Awards from "./screens/Awards";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Entypo name="home" size={24} color="black" />
                </View>
              );
            },
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Entypo name="chat" size={24} color="black" />
                </View>
              );
            },
          }}
        ></Tab.Screen>

<Tab.Screen
          name="Exchange"
          component={Exchange}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                  backgroundColor:'#CBC3E3',
                  width: 50,
                  height: 50,
                  top:-15,
        
                }}>
                  <FontAwesome name="exchange" size={24} color="black" />
                </View>
              );
            },
          }}
        ></Tab.Screen>




        <Tab.Screen
          name="Leader_Board"
          component={Leader_Board}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Entypo name="bar-graph" size={24} color="black" />
                </View>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Awards"
          component={Awards}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Ionicons name="settings" size={24} color="black" />
                </View>
              );
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


