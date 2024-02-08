import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const Home = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState("0");

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
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
              }}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.okButton} onPress={()=>{setModalVisible(false)}}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    alignItems:'center'
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
});

export default Home;
