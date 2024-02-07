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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blurredBadgeIds, setBlurredBadgeIds] = useState(new Set());

  const [activeBadges, setActiveBadges] = useState([]);

  const [badgeName, setBadgeName] = useState("");
  const [descName, setDescName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentActiveBadge, setCurrentActiveBadge] = useState({
    badgeId: "",
    imageURL: "",
    name: "",
    description: "",
    weight: null,
  });

  const badges = [
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 1,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 2,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 3,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1V9eK0u-ZyHDNjEaVJXeC7QZ9Mf2eiEUB",
      badgeId: 4,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 5,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 6,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 7,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 8,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 9,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 10,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 11,
      clicked: false,
    },
    {
      imageURL:
        "https://drive.google.com/uc?export=view&id=1bnL_DIgmSAVyLKOX9jTB7RFSNEPHywwo",
      badgeId: 12,
      clicked: false,
    },
  ];

  const toggleModal = (badge) => {
    setBadgeName("");
    setDescName("");
    setSelectedOption("");

    console.log(currentActiveBadge);
    setCurrentActiveBadge(badge);
    console.log("\n\nBadges\n\n");
    console.log(badge);

    loadBadgeInfo(badge.badgeId);
    setIsModalVisible(true);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const updateCurrentActiveBadge = (newValues) => {
    setCurrentActiveBadge((prev) => ({ ...prev, ...newValues }));
  };

  const handleSave = (badgeName, descName, selectedOption) => {
    console.log("Current: ");
    console.log(currentActiveBadge);

    setCurrentActiveBadge({
      name: badgeName,
      description: descName,
      weight: selectedOption.toString(),
    });

    const updatedBadge = {
      name: badgeName,
      description: descName,
      weight: selectedOption.toString(),
    };

    const badgeIndex = activeBadges.findIndex(
      (badge) => badge.badgeId === currentActiveBadge.badgeId
    );

    if (badgeIndex !== -1) {
      // If badge exists, update its properties
      setActiveBadges((prevActiveBadges) => {
        const updatedBadges = [...prevActiveBadges];
        updatedBadges[badgeIndex] = {
          ...updatedBadges[badgeIndex],
          ...updatedBadge,
        };
        return updatedBadges;
      });
    } else {
      // If badge does not exist, add it to the active badges
      setActiveBadges((prevActiveBadges) => [
        ...prevActiveBadges,
        {
          badgeId: currentActiveBadge.badgeId,
          imageURL: currentActiveBadge.imageURL,
          name: badgeName,
          description: descName,
          weight: selectedOption.toString(),
        },
      ]);
    }

    setBadgeName("");
    setDescName("");
    setSelectedOption("");

    // setActiveBadges((prevActiveBadges) => [
    //   ...prevActiveBadges,
    //   {
    //     badgeId: currentActiveBadge.badgeId,
    //     imageURL: currentActiveBadge.imageURL,
    //     name: badgeName,
    //     description: descName,
    //     weight: selectedOption.toString(),
    //   },
    // ]);

    console.log("\n\nCurrent Active Badgge\n\n");

    console.log(currentActiveBadge);

    console.log("\nActive Badges\n", activeBadges);

    setBlurredBadgeIds(
      (prevSet) => new Set([...prevSet, currentActiveBadge.badgeId])
    );

    setIsModalVisible(false);

    // Do whatever you want to do with the saved badge data
  };

  const handleDiscard = () => {

    setActiveBadges((prevActiveBadges) =>
      prevActiveBadges.filter(
        (badge) => badge.badgeId !== currentActiveBadge.badgeId
      )
    );


      // Remove the badge ID from blurredBadgeIds set
      setBlurredBadgeIds((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(currentActiveBadge.badgeId);
        return newSet;
      });

      
    setIsModalVisible(false);
    
  };

  const loadBadgeInfo = (badgeId) => {
    const badgeInfo = activeBadges.find((badge) => badge.badgeId === badgeId);
    if (badgeInfo) {
      setBadgeName(badgeInfo.name);
      setDescName(badgeInfo.description);
      setSelectedOption(badgeInfo.weight);
    }
  };

  const renderBadgeItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleModal(item)}>
      <View style={styles.imageCard}>
        <Image
          source={{ uri: item.imageURL }}
          style={[
            styles.circularImage,
            blurredBadgeIds.has(item.badgeId) ? { opacity: 0.5 } : null,
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.cardContainer}>
          <FlatList
            data={badges}
            numColumns={2}
            keyExtractor={(item) => item.badgeId.toString()}
            renderItem={renderBadgeItem}
          />
        </View>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Badge Information</Text>
              <TouchableWithoutFeedback onPress={handleDiscard}>
                <FontAwesome5
                  name="times"
                  size={20}
                  style={styles.modalClose}
                />
              </TouchableWithoutFeedback>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.badgeImageContainer}>
                <Image
                  source={{ uri: currentActiveBadge.imageURL }}
                  style={styles.circularImage}
                />
              </View>

              {/* <View>
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
              </View>  */}

              {/* <View>
                <Text style={styles.label}>Select Weight For the Badge</Text>
                <View style={styles.radioButtonContainer}>
                  {[10, 20, 30].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.next,
                        selectedOption === option
                          ? styles.selectedRadioButton
                          : null,
                      ]}
                      onPress={() => handleSelectOption(option)}
                    >
                      <Text style={styles.buttonText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View> */}

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
                <View style={styles.radioButtonContainer}>
                  {["10", "20", "30"].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.next,
                        selectedOption === option
                          ? styles.selectedRadioButton
                          : null,
                      ]}
                      onPress={() => handleSelectOption(option)}
                    >
                      <Text style={styles.buttonText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() =>
                    handleSave(badgeName, descName, selectedOption)
                  }
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.discard}
                  onPress={handleDiscard}
                >
                  <Text style={styles.buttonText}>Discard</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circularImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 27,
    marginHorizontal: 12,
    marginBottom: 27,
    borderColor: "black",
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#5c9af8",
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
  badgeImageContainer: {
    alignItems: "center",
  },
  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 3,
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
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    backgroundColor: "#5c9af8",
    padding: 15,
    borderRadius: 10,
    width: 100,
    height: 50,
    borderColor: "#2980b9",
    alignItems: "center",
    marginTop: 10,
  },
  discard: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    width: 100,
    height: 50,
    borderColor: "#c0392b",
    alignItems: "center",
    marginTop: 10,
  },
  selectedRadioButton: {
    backgroundColor: "#5c9af8",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Awards;
