import React, { useState } from 'react'; // Importing react and useState
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'; // Import necessary components for the UI
import { Calendar } from 'react-native-calendars'; // Importing a calendar to allow users to select a date
import { Ionicons } from '@expo/vector-icons'; // Provides the icons needed for the UI
import circle from './assets/circles_.png'; // importing the image for background
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
      {/*The code below displays the circles in the background*/}
         <View style={styles.image}>
      <Image
        source={circle}
      />
     </View>
     {/* The code below creates the textbox that is meant for inputting the task name */}
      <Text style={styles.label}>Task:</Text>
      <TextInput
        style={styles.input}
        placeholder="Input the task name!" // this will be viewed in the text box
        onChangeText={setTask} // This will update the state of "task" based on what the user inputted
      />

      {/* This applies the same functionality as the code above but for description of the task*/}
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the task!" // this will be viewed in the description textbox
        onChangeText={setDescription} // when the text is inputted, this function will be called to set the description value 
      />
      
      {/* The code below views the calendar, and edits the color of it */}
      <Text style={styles.dateLabel}>Date: {selectedDate}</Text>
      <Calendar
        onDayPress={onDayPress} // Calls the onDayPress function when a date is selected to make it in the specified YYY-MM-DD format 
        markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: 'rgba(78, 197, 197, 1)' } }} // when a date is selected, its color will be changed to teal
        theme={{
          // The following code below formats colors of specific components in the calendar 
          selectedDayBackgroundColor: 'rgba(78, 197, 197, 1)',
          arrowColor: '#333', // setting color of the arrow to black
          monthTextColor: '#333', // selecting color of the month to black
          indicatorColor: 'rgba(78, 197, 197, 1)', // setting color for when the date is selected
        }}
      />
      
      {/* Code below displays "Set priority" text including the thermometer icons */}
      <View style={styles.priorityRow}>
        <Text style={styles.priorityLabel}>Set Priority:</Text>
        <TouchableOpacity
        // this creates the priority button (low/green) and changes the value of priority if the button was pressed on
          style={[styles.priorityButton, priority === 1 && styles.selectedPriority(1)]}
          onPress={() => prioritySelect(1)}  // once pressed, call the function
        >
          {/* set the icon green */}
          <Ionicons name="thermometer" size={20} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
         // this creates the priority button (med/orange) and changes the value of priority if the button was pressed on
          style={[styles.priorityButton, priority === 2 && styles.selectedPriority(2)]}
          onPress={() => prioritySelect(2)} // once pressed, call the function
        >
          {/* set the icon orange */}
          <Ionicons name="thermometer" size={20} color="orange" /> 
        </TouchableOpacity>

        <TouchableOpacity
         // this creates the priority button (high/red) and changes the value of priority if the button was pressed on
          style={[styles.priorityButton, priority === 3 && styles.selectedPriority(3)]}
          onPress={() => prioritySelect(3)} // once pressed, call the function
        >
          {/* set the icon red */}
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
    </View> 
  );
}
// The following code below defines the style (color, appearance, alignment, etc.) of each component in the UI
const styles = StyleSheet.create({
  // Here we make the container for all the components in the page, 
  container: {
    flexGrow: 1, // taking up extra space available on the phone 
    backgroundColor: '#fff', // setting bavkground color to white
    padding: 20, // adding padding across the screen edge (so components dont look expanded)
    paddingTop: 80, // add padding only in the top (make components go lower)
  },
  // the label below is strictly for the labels on top of the firts two textboxes
  label: {
    fontSize: 16, // adjusting fotn size
    color: '#333', // setting font color to black
    marginBottom: 5, // creating space between the font and whats below it 
  },
  // these are the styles for the two textboxes on the top page
  input: {
    height: 40, // setting the height of the pages (how long it it)
    borderColor: '#ccc', // setting the border color to grey
    borderWidth: 1, // setting border width/thickness
    marginBottom: 15, // creating a space between the text box and whats below it
    paddingHorizontal: 15, // creating the horizontal padding for the text to be inputted in the textbox
    borderRadius: 7, // roundness of the edges
    backgroundColor: 'rgba(247, 136, 136, 0.3)', // setting background color of the textbox
  },
  // The style below is strictly for the date label
  dateLabel: {
    marginBottom: 15, // setting distance between the date and whats below it
    fontSize: 16, // setting font size
    color: '#333', // setting font color to black
  },
  // this style is strictly for the priority label
  priorityLabel: {
    fontSize: 16, // setting font size
    color: '#333', // setting font color
    marginRight: 10, // setting distance between the label and whats on the right of it
  },
  // this style is for the images on top of the page
  image: {
    position: 'absolute', // this allows us to place the image anywhere on the screen having to adjust it manually to move. it automatically gets placed in top left corner
  },
  // this style is for the priority icons
  priorityRow: {
    flexDirection: 'row', // makes child elements (elements created under it) line up horizontally
    alignItems: 'center', // aligns child elements to the center
    marginBottom: 20, // creates a space between it and the bottom components
    marginTop: 20,    // creates space between it and top components
  },
// this style is for the priority buttons/icons
  priorityButton: {
    padding: 8, // this increases the overall padding around the button
    marginHorizontal: 9, // this creates the distance between the button from the right and left between other components
  },
  // code below sets the background color of the priority button depending on the icon pressed
  selectedPriority: (color) => ({
    backgroundColor: color === 1 ? '#CCFFCC' : color === 2 ? '#FFE5CC' : '#FFCCCC',
    borderRadius: 7, // sets the radius of the border (the more it is the smoother the borders are) 
  }),
  // sets the style of the linkToChild button
  button: {
    backgroundColor: 'rgba(247, 136, 136, 1)', // sets the color to coral-ish pink
    padding: 15, // sets space between text and edge of button
    borderRadius: 5, // sets smoothness of borders
    alignItems: 'center', // align the text of the button to the center
    marginVertical: 5, // sets space between the button and other vertically present components 
  },
  // setting the style for the save button
  saveButton: {
    backgroundColor: 'rgba(247, 136, 136, 1)', // setting the background color to coral-ish pink
    padding: 15, // creates distance between text in button and button edges
    borderRadius: 5, // smoothens the border
    alignItems: 'center', // aligns text in button to be in center
    marginTop: 4, // creates distance between button and components above it 
  },
  // style below sets the text of the buttons
  buttonText: {
    color: '#fff', // set color to white
    fontWeight: 'bold', // make the font bold
  }, 
});
