import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Leader_Board() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedOption === 'option1' ? styles.selectedRadioButton : null,
        ]}
        onPress={() => handleSelectOption('option1')}
      >
        <Text>Option 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedOption === 'option2' ? styles.selectedRadioButton : null,
        ]}
        onPress={() => handleSelectOption('option2')}
      >
        <Text>Option 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedOption === 'option3' ? styles.selectedRadioButton : null,
        ]}
        onPress={() => handleSelectOption('option3')}
      >
        <Text>Option 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  selectedRadioButton: {
    backgroundColor: 'blue', // Change the color when selected
  },
});

export default Leader_Board;
