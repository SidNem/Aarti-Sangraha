
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome5 } from "react-native-vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import skillsArray from "./static data/skills";
import interestsArray from "./static data/interest";
import SkillCard from "./static data/SkillCard";
import { AntDesign } from "@expo/vector-icons";
import Awards from "./Awards";



const FormComponent = () => {
  const inputFields = Array.from({ length: 10 }, (_, index) => index); // Create an array of length 10

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {inputFields.map((field, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Input ${index + 1}`}
            placeholderTextColor="#888"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5c9af8', // light blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    width: '90%', // Adjust the width percentage as needed
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop:20,
    margin: 10, // Add margin for spacing
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10, // Add margin bottom for spacing between input fields
  },
});

export default FormComponent;
