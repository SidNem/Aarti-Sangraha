import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  StyleSheet,

} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

const COLORS = {
  white: "#fff",
  black: "#000",
  blue: "#5D5FEE",
  grey: "#BABBC3",
  light: "#F3F4FB",
  darkBlue: "#7978B5",
  red: "red",
};
function InputForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");



  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDate(false);
    setEndDate(currentDate);
  };

  const showStartDatePicker = () => {
    setShowStartDate(true);
  };

  const showEndDatePicker = () => {
    setShowEndDate(true);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear() % 100; // Get the last two digits of the year
    return `${day}/${month}/${year}`;
  };






















  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

     

      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.label}>Select Start Date</Text>
          <TouchableOpacity style={styles.calender} onPress={showStartDatePicker}>
            <FontAwesome name="calendar" size={24} color="black" />

            <Text style={styles.buttonText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>
        </View>

        <View styles={{marginLeft:20,}}>
          <Text style={styles.label}>Select End Date</Text>
          <TouchableOpacity style={styles.calender} onPress={showEndDatePicker}>
            <FontAwesome name="calendar" size={24} color="black" />

            <Text style={styles.buttonText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showStartDate && (
        <DateTimePicker
          testID="startDatePicker"
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      {showEndDate && (
        <DateTimePicker
          testID="endDatePicker"
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

    























    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom:5,
  },
  input: {
    height: 40,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    padding: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    marginLeft: 12,
  },
  calender: {
    backgroundColor: COLORS.grey,
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    width: 140,
    height: 60,
    flexDirection: "row",
    borderColor: "#D3D3D3",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent:'space-between'

  },
});

export default InputForm;
