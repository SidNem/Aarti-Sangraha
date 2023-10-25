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

function Settings() {
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

  const [imageName, setImageName] = useState("Add a File");

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

  const toggleSkill = (skill) => {
    const updatedSkills = new Set(selectedSkills);
    if (updatedSkills.has(skill)) {
      updatedSkills.delete(skill);
    } else {
      updatedSkills.add(skill);
    }
    setSelectedSkills(updatedSkills);
  };

  const openModal = () => {
    setSkillModalVisible(true);
  };

  const closeModal = () => {
    setSkillModalVisible(false);
  };

  const toggleInterest = (interest) => {
    const updatedInterests = new Set(selectedInterests);
    if (updatedInterests.has(interest)) {
      updatedInterests.delete(interest);
    } else {
      updatedInterests.add(interest);
    }
    setSelectedInterests(updatedInterests);
  };

  const openShowInterestModal = () => {
    setShowInterestModal(true);
  };

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
              <TouchableOpacity style={styles.calender} onPress={showStartDatePicker}>
                <FontAwesome name="calendar" size={30} color="black" />
                <Text style={styles.buttonText}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.label}>Select End Date</Text>
              <TouchableOpacity style={styles.calender} onPress={showEndDatePicker}>
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
                <Image source={{ uri: selectedImageUri }} style={styles.image} />
              )}
            </View>

            <View>
              <View>
                <Text style={styles.label}>Enter Description</Text>
              </View>

              <TouchableOpacity style={styles.calender} onPress={() => SetIsModalVisible(true)}>
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
                <TouchableWithoutFeedback onPress={() => SetIsModalVisible(false)}>
                  <FontAwesome5 name="times" size={20} style={styles.modalClose} />
                </TouchableWithoutFeedback>
              </View>

              <View style={styles.modalContent}>
                <RichEditor
                  ref={(ref) => (this.richTextEditor = ref)}
                  style={styles.richEditor}
                  initialContentHTML={content}
                  editorInitializedCallback={() => console.log("Editor is ready")}
                  onChange={onEditorChange}
                />
                <RichToolbar getEditor={() => this.richTextEditor} />
              </View>
            </View>
          </Modal>
        </View>

        {/* ... (Your skills and interests sections) */}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
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
  richEditor: {
    flex: 1,
  },
  // ... (The rest of your styles)
});

export default Settings;
