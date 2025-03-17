import React, { useState } from 'react'; // Importing react and useState
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'; // Import necessary components for the UI
import { Calendar } from 'react-native-calendars'; // Importing a calendar to allow users to select a date
import { Ionicons } from '@expo/vector-icons'; // Provides the icons needed for the UI

// The function below defines the main component, where it defines the state of the task name, description, date to be done, and priority
export default function App() {
  const [task, setTask] = useState(''); // default value of task is empty string
  const [description, setDescription] = useState(''); // default value of description is empty string
  const [selectedDate, setSelectedDate] = useState(''); // default value of selected date is empty string
  const [priority, setPriority] = useState(0); // Priority in this case is 0 (no priority) there are three total levels (1,2,3) which indicate low, medium, and high

  // The code below updates the "setSelectedDate" constant to the selected date in YYYY-MM-DD format
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // The code below updates the setPriority constant to the new priority level selected
  const prioritySelect = (level) => {
    setPriority(level);
  };

  return (
    <View style={styles.container}>
      {/*The code below displays the "task" text and the textbox where the user will input the task name*/}
      <Text style={styles.label}>Task:</Text>
      <TextInput
        style={styles.input}
        value={task} // binds input to task state
        placeholder="Input the task name!" // this will be viewed in the text box
        onChangeText={setTask} // This will update the state of "task" based on what the user inputted
      />

      {/* This applies the same functionality as the code above but for description*/}
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the task!" // this will be viewed in the description textbox
        value={description} 
        onChangeText={setDescription} // when the text is inputted, this function will be called to set the description value 
      />

      <Text style={styles.dateLabel}>Date: {selectedDate}</Text>
      <Calendar
        onDayPress={onDayPress} // Calls the onDayPress function when a date is selected to make it in the specified YYY-MM-DD format 
        markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: 'rgba(78, 197, 197, 1)' } }} // when a date is selected, its color will be changed to teal
        theme={{
          // The following code below formats colors of specific components in the calendar 
          selectedDayBackgroundColor: 'rgba(78, 197, 197, 1)',
          arrowColor: '#333',
          monthTextColor: '#333', 
          indicatorColor: 'rgba(78, 197, 197, 1)', 
          backgroundColor: 'rgba(78, 197, 197, 0.5)',
        }}
      />
      
      {/* Code below displays "Set priority" including the thermometer icons */}
      <View style={styles.priorityRow}>
        <Text style={styles.priorityLabel}>Set Priority:</Text>
        <TouchableOpacity
        // this applies the style for the priority button (low/green) and changes the value of priority if the button was pressed on
          style={[styles.priorityButton, priority === 1 && styles.selectedPriority(1)]}
          onPress={() => prioritySelect(1)} 
        >
          <Ionicons name="thermometer" size={20} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
         // this applies the style for the priority button (med/orange) and changes the value of priority if the button was pressed on
          style={[styles.priorityButton, priority === 2 && styles.selectedPriority(2)]}
          onPress={() => prioritySelect(2)} 
        >
          <Ionicons name="thermometer" size={20} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
         // this applies the style for the priority button (high/red) and changes the value of priority if the button was pressed on
          style={[styles.priorityButton, priority === 3 && styles.selectedPriority(3)]}
          onPress={() => prioritySelect(3)} 
        >
          <Ionicons name="thermometer" size={20} color="red" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        {/* This views the last two buttons in the page, which are the "Link to child" button and "Save" button */}
        <Text style={styles.buttonText}>Link to Child</Text> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
// The following code below defines the style (color, appearance, alignment, etc.) of each component in the UI
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    paddingTop: 90, 
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5, 
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(247, 136, 136, 0.3)',
  },
  dateLabel: {
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  priorityLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10, 
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, 
    marginTop: 20,   
  },
  priorityButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5, 
    marginHorizontal: 5,
  },
  selectedPriority: (color) => ({
    backgroundColor: color === 1 ? '#CCFFCC' : color === 2 ? '#FFE5CC' : '#FFCCCC',
    borderRadius: 5,
  }),
  button: {
    backgroundColor: 'rgba(247, 136, 136, 1)', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 2, 
  },
  saveButton: {
    backgroundColor: 'rgba(247, 136, 136, 1)', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 2, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
