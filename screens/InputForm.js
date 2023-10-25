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

import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import skillsArray from "./static data/skills";
import interestsArray from "./static data/interest";
import SkillCard from "./static data/SkillCard";

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
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [isModalVisible, SetIsModalVisible] = useState(false);

  const [SkillModalVisible, setSkillModalVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const [isShowInterestModalVisible, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const [content, setContent] = useState("");

  const [imageName,setImageName] = useState("Add a File");

  const onEditorChange = (html) => {
    setContent(html);
  };

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

  pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
      //console.log(result.canceled);
      if (!result.canceled) {
        setSelectedImageUri(result.assets[0].uri);
        setImageName(result.assets[0].name);
      } else {
        console.log("Didn't select the document");
      }
    } catch (error) {
      console.log("Error in uploading document:", error);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    return `${day}/${month}/${year}`;
  };

  // Toggle skill selection
  const toggleSkill = (skill) => {
    const updatedSkills = new Set(selectedSkills);
    if (updatedSkills.has(skill)) {
      updatedSkills.delete(skill);
    } else {
      updatedSkills.add(skill);
    }
    setSelectedSkills(updatedSkills);
  };

  //Open Skill Modal
  const openModal = () => {
    setSkillModalVisible(true);
  };

  //Close skill modal
  const closeModal = () => {
    setSkillModalVisible(false);
  };

  // Toggle interest selection
  const toggleInterest = (interest) => {
    const updatedInterests = new Set(selectedInterests);
    if (updatedInterests.has(interest)) {
      updatedInterests.delete(interest);
    } else {
      updatedInterests.add(interest);
    }
    setSelectedInterests(updatedInterests);
  };

  //Open Interest Modal
  const openShowInterestModal = () => {
    setShowInterestModal(true);
  };

  //Close skill modal
  const closeShowInterestModal = () => {
    setShowInterestModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <View style={styles.cardContainer}>
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
    </View>
        
    <View style={styles.cardContainer}>
        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.label}>Select Start Date</Text>
            <TouchableOpacity
              style={styles.calender}
              onPress={showStartDatePicker}
            >
              <FontAwesome name="calendar" size={30} color="black" />

              <Text style={styles.buttonText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
          </View>

          <View styles={{ marginLeft: 20 }}>
            <Text style={styles.label}>Select End Date</Text>
            <TouchableOpacity
              style={styles.calender}
              onPress={showEndDatePicker}
            >
              <FontAwesome name="calendar" size={30} color="black" />

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

        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.label}>Select Event Poster</Text>
            <TouchableOpacity style={styles.calender} onPress={pickDocument}>
              <Text style={styles.buttonText}>{imageName}</Text>
            </TouchableOpacity>
            {selectedImageUri && (
          <Image
            source={{ uri: selectedImageUri }}
            style={{ width: '100%', height: 200, marginTop: 20 }}
          />
        )}
          </View>

          <View>
            <View>
              <Text style={styles.label}>Enter Description</Text>
            </View>

            <TouchableOpacity
              style={styles.calender}
              onPress={() => {
                SetIsModalVisible(true);
              }}
            >
              <Text>Add a Description</Text>
            </TouchableOpacity>
          </View>
        </View>

        </View>

       
        <View style={styles.cardContainer}>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => {
            SetIsModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Description</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  SetIsModalVisible(false);
                }}
              >
                <FontAwesome5
                  name="times"
                  size={20}
                  style={styles.modalClose}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.modalContent}>
              <RichEditor
                ref={(ref) => (this.richTextEditor = ref)}
                style={{ flex: 1 }}
                initialContentHTML={content}
                editorInitializedCallback={() => console.log("Editor is ready")}
                onChange={onEditorChange}
              />
              <RichToolbar getEditor={() => this.richTextEditor} />
            </View>
          </View>
        </Modal>

        <View style={styles.skillsSection}>
          <View style={styles.add_margin}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <TouchableOpacity style={styles.update_about} onPress={openModal}>
              <FontAwesome5 name="edit" size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.skillsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedSkills.size > 0 ? (
                Array.from(selectedSkills).map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))
              ) : (
                <Text style={styles.noSkillsMessage}>
                  No Skills have been added
                </Text>
              )}
            </ScrollView>
            {selectedSkills.size !== 0 && (
              <Text style={styles.more_text}>
                Scroll <FontAwesome name="arrow-circle-right" size={16} /> for
                more
              </Text>
            )}
          </View>
        </View>
        {/* -------------------Skill Selection Modal-------------------- */}

       
        <Modal
          transparent={true}
          visible={SkillModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Skills</Text>
              <TouchableWithoutFeedback onPress={closeModal}>
                <FontAwesome5
                  name="times"
                  size={20}
                  style={styles.modalClose}
                />
              </TouchableWithoutFeedback>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalDescription}>Select your skills:</Text>
              <View style={styles.skillList}>
                {skillsArray.map((skill) => (
                  <TouchableOpacity
                    key={skill}
                    style={[
                      styles.skillItem,
                      {
                        backgroundColor: selectedSkills.has(skill)
                          ? "#1e3799"
                          : "#fff",
                        borderColor: selectedSkills.has(skill)
                          ? "#fff"
                          : "#1e3799",
                      },
                    ]}
                    onPress={() => toggleSkill(skill)}
                  >
                    <Text
                      style={{
                        color: selectedSkills.has(skill) ? "#fff" : "#1e3799",
                      }}
                    >
                      {skill}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Modal>
        </View>

        {/* -------------------------Interests Section--------------------- */}
        <View style={styles.cardContainer}>
        <View style={styles.skillsSection}>
          <View style={styles.add_margin}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <TouchableOpacity
              style={styles.update_about}
              onPress={openShowInterestModal}
            >
              <FontAwesome5 name="edit" size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.skillsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedInterests.size > 0 ? (
                Array.from(selectedInterests).map((interest, index) => (
                  <SkillCard key={index} skill={interest} color={"lightblue"} />
                ))
              ) : (
                <Text style={styles.noSkillsMessage}>
                  No Interests have been added
                </Text>
              )}
            </ScrollView>
            {selectedInterests.size !== 0 && (
              <Text style={styles.more_text}>
                Scroll <FontAwesome name="arrow-circle-right" size={16} /> for
                more
              </Text>
            )}
          </View>
        </View>
        </View>
        {/* -------------------------Interest Selection Modal------------------------- */}
        <Modal
          transparent={true}
          visible={isShowInterestModalVisible}
          animationType="slide"
          onRequestClose={closeShowInterestModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Interests</Text>
              <TouchableWithoutFeedback onPress={closeShowInterestModal}>
                <FontAwesome5
                  name="times"
                  size={20}
                  style={styles.modalClose}
                />
              </TouchableWithoutFeedback>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                Select your interests:
              </Text>
              <View style={styles.skillList}>
                {interestsArray.map((interest) => (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.skillItem,
                      {
                        backgroundColor: selectedInterests.has(interest)
                          ? "#1e3799"
                          : "#fff",
                        borderColor: selectedInterests.has(interest)
                          ? "#fff"
                          : "#1e3799",
                      },
                    ]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text
                      style={{
                        color: selectedInterests.has(interest)
                          ? "#fff"
                          : "#1e3799",
                      }}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Modal>

      
      </ScrollView>
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
    marginBottom: 5,
    marginTop: 5,
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#E6E6E6',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    marginLeft: 12,
  },
  calender: {
    backgroundColor: '#E6E6E6',
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    width: '100%',
    height: 60,
    flexDirection: "row",
    borderColor: "#D3D3D3",
    justifyContent: 'space-around',
  },
  dateContainer: {
    justifyContent:'space-between',
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
  skillsSection: {
    margin: 4,
    padding: 25,
   
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3799",
  },

  update_about: {
    position: "absolute",
    right: -5,
    bottom: -10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "white",
    opacity: 0.8,
    color: "black",
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 10,
  },
  skillsContainer: {
    width: "100%", // Set the container width to 100% of the available width
  },

  noSkillsMessage: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  more_text: {
    marginTop: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3799",
    marginBottom: 8,
  },
  cardContainer: {
    backgroundColor: 'white', // Background color of the card
    borderRadius: 10, // Rounded corners for the card
    padding: 20, // Spacing inside the card
    elevation: 3, // Controls the shadow depth
    shadowColor: 'black', // Color of the shadow
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    width:340,
    marginBottom:10,
  },
  
});

export default InputForm;
