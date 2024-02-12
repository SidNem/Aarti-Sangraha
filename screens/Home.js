import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

import { Swipeable } from 'react-native-gesture-handler';



const Home = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState("0");
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const expensesData = await AsyncStorage.getItem('expenses');
      if (expensesData !== null) {
        const parsedExpenses = JSON.parse(expensesData);
        setExpenses(parsedExpenses);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const balanceData = await AsyncStorage.getItem('balance');
      if (balanceData !== null) {
        setBalance(balanceData);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchBalance(); // Call fetchBalance in useEffect
  }, []);

  // Use useFocusEffect to refetch expenses when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchExpenses();
      fetchBalance(); // Fetch balance again when screen comes into focus
    }, [])
  );

  const saveBalance = async (value) => {
    try {
      await AsyncStorage.setItem('balance', value);
      setBalance(value); // Update balance state after saving to AsyncStorage
    } catch (error) {
      console.error('Error saving balance:', error);
    }
  };


  const handlePress = () => {
    setModalVisible(true);
  };
  const renderItem = ({ item }) => {
    const handleEdit = () => {
      // Implement edit functionality here
      console.log("edit called");
    };

    const handleDelete = () => {
      // Implement delete functionality here
      console.log("delete called");
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardFlat}>
          <Text style={styles.itemTitle}>{item.productName}</Text>
          <Text style={styles.itemExpense}>Expense: {item.expense}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleEdit}>
              <AntDesign name="edit" size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <AntDesign name="delete" size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={handlePress}>
        <LinearGradient
          colors={["#FF69B4", "#8A2BE2"]}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.balanceText}>Total Balance</Text>
          <View style={styles.balanceContainer}>
            <FontAwesome
              name="rupee"
              size={40}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.balance}>{balance}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
      
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#FF69B4", "#8A2BE2"]}
            style={styles.modalHeaderGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Balance</Text>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <FontAwesome5
                  name="times"
                  style={[styles.modalClose, { fontSize: 24 }]}
                />
              </TouchableWithoutFeedback>
            </View>
          </LinearGradient>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter New Balance</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Balance"
              value={balance}
              onChangeText={(text) => {
                // Regular expression to allow numbers and a single decimal point
                const formattedText = text.replace(/[^0-9.]/g, ""); // Allow numbers and dot
                setBalance(formattedText);
                saveBalance(formattedText); // Save balance to AsyncStorage
              }}
              keyboardType="numeric"
            />
         
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  setBalance("0");
                  saveBalance("0"); // Save balance to AsyncStorage
                }}
              >
                <Text style={styles.okButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  cardContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  cardFlat: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%', // Adjust the width as needed
    marginBottom:15,
    flexDirection:"row",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemExpense: {
    fontSize: 14,
  },
  flatList: {
    paddingBottom: 60, // Adjust this value as needed
  },
  card: {
    borderRadius: 30,
    elevation: 5, // This is for Android elevation
    shadowColor: "#000", // This is for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    margin: 30,
    padding: 15,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "flex-start", // Change to 'flex-start' to position the content at the top
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  modalHeaderGradient: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  modalClose: {
    color: "#fff",
    marginRight: 15,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10, // Add margin to separate it from the balance
  },
  balance: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: 5, // Add margin to separate it from the rupee icon
  },
  icon: {
    marginRight: 5, // Adjusted margin to provide spacing between the icon and the balance text
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 20,
    marginTop: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    padding: 10,
    borderRadius: 10,
  },

  okButton: {
    backgroundColor: "#7FFF00",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
    width: 100,
  },
  okButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "column", // Change to 'column' to stack icons vertically
    alignItems: "flex-end", // Align icons to the right
    marginTop: 10, // Add margin to separate icons from the text
  },

  line: {
    height: 30,
    width: 1,
    backgroundColor: "#000", // Change the color as needed
    marginVertical: 15, // Adjust the spacing between the icons and the line
  },
  
});

export default Home;
