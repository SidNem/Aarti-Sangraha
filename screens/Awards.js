import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "react-native-vector-icons";
function Awards() {
  const imageURIs = [
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
    // Add more image URIs as needed
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const BadgeObject = { img: null, Weight: null, Name: null, Desc: null };

  const [selectedBadgeImg, setSelectedBadgeImg] = useState(null);

  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState(null);

  const badgeInfo = [{}];

  const [badgeName, setBadgeName] = useState("");

  const [descName, setDescName] = useState("");

  const [badgeDetails, setBadgeDetails] = useState([]); 

  const [clickedBadges, setClickedBadges] = useState(
    new Array(imageURIs.length).fill(false)
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const toggleModal = (index, image) => {
    setSelectedBadgeIndex(index);

  // Check if badge information is already stored

  BadgeObject.img = image;
  setSelectedBadgeImg(image);
  BadgeObject.img = image;
  console.log(BadgeObject.img);
  setIsModalVisible(true);
};

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };


  const handleSave = (name,desc,weight) => {
    console.log(name,weight,desc);
    if (badgeName && descName && selectedOption) {
      // Create a new badge object with the entered information
     
      BadgeObject.Name = name;
      BadgeObject.Desc = desc;
      BadgeObject.Weight = weight;

      badgeInfo.push(BadgeObject);

      console.log(badgeInfo);
      

      const updatedClickedBadges = [...clickedBadges];
      updatedClickedBadges[selectedBadgeIndex] = true;
      setClickedBadges(updatedClickedBadges);


      setBadgeName("");
      setDescName("");
      setSelectedOption(null);

      // Close the modal
      setIsModalVisible(false);


    }
  };

  const handleDiscard= () => {
    setBadgeName("");
      setDescName("");
      setSelectedOption(null);

      
      const updatedClickedBadges = [...clickedBadges];
      updatedClickedBadges[selectedBadgeIndex] = false;
      setClickedBadges(updatedClickedBadges);

      // Close the modal
      setIsModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SafeAreaView>
        <View style={styles.cardContainer}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FlatList
              data={imageURIs}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => toggleModal(index, item)}>
                  <View style={styles.imageCard}>
                    <Image
                      source={{ uri: item }}
                      style={[
                        styles.circularImage,
                        clickedBadges[index] === true ? { opacity: 0.5 } : null,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => {
            setIsModalVisible(false);
            for (const key in BadgeObject) {
              BadgeObject[key] = null;
            }
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Badge Information</Text>
              <TouchableWithoutFeedback
                onPress={handleDiscard}
              >
                <FontAwesome5
                  name="times"
                  size={20}
                  style={styles.modalClose}
                />
              </TouchableWithoutFeedback>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: selectedBadgeImg }}
                  style={styles.circularImage}
                />
              </View>

              <View>
                <Text style={styles.label}>Enter For what Badge Is</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter Badge Name"
                  value={badgeName}
                  onChangeText={setBadgeName}
                />
                <Text style={styles.label}>Enter the Description of Badge</Text>
                <TextInput
                  style={styles.descField}
                  placeholder="Enter Badge Description"
                  value={descName}
                  onChangeText={setDescName}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <View>
                <Text style={styles.label}>Select Weight For the Badge</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.next,
                      selectedOption === '10' ? styles.selectedRadioButton : null,
                    ]}
                    onPress={() => handleSelectOption('10')}>
                    <Text>10</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                   style={[
                    styles.next,
                    selectedOption === '20' ? styles.selectedRadioButton : null,
                  ]}
                  onPress={() => handleSelectOption('20')}>
                    <Text>20</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={[
                      styles.next,
                      selectedOption === '30' ? styles.selectedRadioButton : null,
                    ]}
                    onPress={() => handleSelectOption('30')}>
                    <Text>30</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 60,
                }}
              >
                <TouchableOpacity style={styles.save}  onPress={() => {handleSave(badgeName,descName,selectedOption)}}>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.discard} onPress={handleDiscard}>
                  <Text>Discard</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  circularImage: {
    width: 150, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    borderRadius: 75, // Half of width and height to create a circle
    marginTop: 27,
    marginHorizontal: 12,
    marginBottom: 27,
    borderColor: "black",
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#1e3799",
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
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flex: 1,
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  imageCard: {
    backgroundColor: "blue", // White background color for the card
    borderRadius: 5, // Rounded corners for the card
    elevation: 3, // Controls the shadow depth
    shadowColor: "black", // Color of the shadow
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4,
    margin: 3,

    // Adjust the margin as needed
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 5,
  },

  inputField: {
    height: 40,
    width: "100%",
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  descField: {
    height: 50,
    width: "100%",
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  next: {
    backgroundColor: "#E6E6E6",
    padding: 15,
    borderRadius: 10,
    width: 80,
    height: 50,
    borderColor: "#D3D3D3",
    alignItems: "center",
    marginTop: 10,
  },
  save: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    width: 100,
    height: 50,
    borderColor: "#D3D3D3",
    alignItems: "center",
    marginTop: 10,
  },
  discard: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    width: 100,
    height: 50,
    borderColor: "#D3D3D3",
    alignItems: "center",
    marginTop: 10,
  },
  selectedRadioButton: {
    backgroundColor: 'green', // Change the color when selected
  },
});

export default Awards;
