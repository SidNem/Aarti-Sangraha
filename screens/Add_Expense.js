import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import { FontAwesome5 } from "react-native-vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";

const Add_Expense = () => {
  const navigation = useNavigation();
  const [expense, setExpense] = useState("");
  const [productName, setProductName] = useState("");
  const [PurchaseDate, setPurchaseDate] = useState(new Date());

  const [savedExpenses, setSavedExpenses] = useState([]);

  const [showPurchaseDate, setShowPurchaseDate] = useState(false);

  const [productNameError, setProductNameError] = useState("");
  const [expenseError, setExpenseError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [textSelectCategory,setTextSelectCategory] = useState("Select Category");

  const categories = [
    {
      name: "Food & Dining",
      icon: <Ionicons name="fast-food" size={24} color="black" />,
    },
    {
      name: "Groceries",
      icon: <FontAwesome5 name="shopping-cart" size={24} color="black" />,
    },
    {
      name: "Transportation",
      icon: (
        <MaterialIcons name="emoji-transportation" size={24} color="black" />
      ),
    },
    {
      name: "Housing",
      icon: <FontAwesome5 name="house-damage" size={24} color="black" />,
    },
    {
      name: "Health & Medical",
      icon: (
        <MaterialCommunityIcons
          name="hospital-box-outline"
          size={24}
          color="black"
        />
      ),
    },
    {
      name: "Clothing & Accessories",
      icon: <FontAwesome5 name="tshirt" size={24} color="black" />,
    },
    {
      name: "Education",
      icon: (
        <MaterialCommunityIcons name="book-education" size={24} color="black" />
      ),
    },
    {
      name: "Gifts & Donations",
      icon: <FontAwesome5 name="gift" size={24} color="black" />,
    },
    {
      name: "Travel",
      icon: <MaterialIcons name="explore" size={24} color="black" />,
    },
    {
      name: "Miscellaneous",
      icon: (
        <MaterialIcons name="miscellaneous-services" size={24} color="black" />
      ),
    },
  ];

  const showStartDatePicker = () => {
    setShowPurchaseDate(true);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    return `${day}/${month}/${year}`;
  };

  const onChangePurchaseDate = (event, selectedDate) => {
    const currentDate = selectedDate || PurchaseDate;
    setShowPurchaseDate(false);
    setPurchaseDate(currentDate);
  };
  const saveExpense = async () => {
    // Check if expense is greater than balance
    const existingBalance =
      parseFloat(await AsyncStorage.getItem("balance")) || 0;
    const expenseAmount = parseFloat(expense);
    if (expenseAmount > existingBalance) {
      alert("Expense cannot exceed available balance");
      return;
    }

    if (!productName.trim()) {
      setProductNameError("Please enter product name");
      alert("Please Enter Product Name");
      return;
    } else {
      setProductNameError("");
    }
    if (!expense.trim()) {
      setExpenseError("Please enter expense");
      alert("Please Enter Expense");
      return;
    } else {
      setExpenseError("");
    }

    // Constructing the expense object
    const newExpense = {
      productName: productName,
      expense: expense,
      purchaseDate: PurchaseDate,
    };

    // Saving the expense object
    try {
      // Get existing expenses from AsyncStorage
      const existingExpenses = await AsyncStorage.getItem("expenses");
      let expensesArray = [];
      if (existingExpenses !== null) {
        // Parse existing expenses if they exist
        expensesArray = JSON.parse(existingExpenses);
      }
      // Add the new expense to the array
      expensesArray.unshift(newExpense);
      // Store the updated array back to AsyncStorage
      await AsyncStorage.setItem("expenses", JSON.stringify(expensesArray));
      // Update the state with the new expenses
      setSavedExpenses(expensesArray);

      // Update balance
      const updatedBalance = existingBalance - expenseAmount;
      console.log(updatedBalance);
      await AsyncStorage.setItem("balance", updatedBalance.toString());
    } catch (error) {
      console.error("Error saving expense:", error);
    }

    // Clearing fields
    setProductName("");
    setExpense("");
    setPurchaseDate(new Date());

    navigation.navigate("Home");
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardFlat}>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => {
            setSelectedCategory(item.icon);
            setTextSelectCategory(item.name);
            console.log(item.name);
            setIsModalVisible(false);
          }}
        >
          <Text style={styles.categoryName}>{item.name}</Text>
          {item.icon}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Product Name"
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>Enter Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Expense"
          value={expense}
          onChangeText={setExpense}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Select Purchase Date</Text>
        <TouchableOpacity style={styles.calender} onPress={showStartDatePicker}>
          <FontAwesome name="calendar" size={25} color="black" />
          <Text style={styles.buttonText}>{formatDate(PurchaseDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
            setTextSelectCategory(`${selectedCategory}`);
          }}
          style={{
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
            borderColor: "#BDBDBD",
            backgroundColor: "#E6E6E6",
          }}
        >
          <Text>{textSelectCategory}</Text>
        </TouchableOpacity>

        {showPurchaseDate && (
          <DateTimePicker
            testID="startDatePicker"
            value={PurchaseDate}
            mode="date"
            display="default"
            onChange={onChangePurchaseDate}
          />
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={styles.okButton} onPress={saveExpense}>
            <Text style={styles.okButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => {
              setProductName("");
              setExpense("");
              setPurchaseDate(new Date());
            }}
          >
            <Text style={styles.okButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() =>{ setTextSelectCategory("Select Category"); setIsModalVisible(false);}
           } >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#FF69B4", "#8A2BE2"]}
            style={styles.modalHeaderGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Categories</Text>
              <TouchableWithoutFeedback
                onPress={() => setIsModalVisible(false)}
              >
                <FontAwesome5
                  name="times"
                  style={[styles.modalClose, { fontSize: 24 }]}
                />
              </TouchableWithoutFeedback>
            </View>
          </LinearGradient>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    flex: 0.99,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
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
  calender: {
    //backgroundColor: "#E6E6E6",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    width: "100%",
    height: 60,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    justifyContent: "space-around",
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
  buttonText: {
    color: "black",
    fontSize: 20,
    marginLeft: 12,
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
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    color: "black",
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
  cardContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  cardFlat: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%", // Adjust the width as needed
    marginBottom: 10,
    flexDirection: "row",
  },

  categoryItem: {
    flexDirection: "row",
    flex:1,
    justifyContent: "space-between",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  categoryName: {
    fontSize: 18,
  },
});
export default Add_Expense;
