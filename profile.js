import React, { useState, useEffect } from "react";
import { View, Text,  ScrollView, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons'; // Provides the icons needed for the UI
import { SelectList } from 'react-native-dropdown-select-list'

const Profile = () => {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState(""); 
  const [age, setAge] = useState(""); 
  const auth = getAuth();
  const [color, setColor] = useState("");
  const [selected, setSelected] = useState(""); // Add a state variable for the selected value


  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pink', value: 'pink' },
  ];


  const addChild = () => {
    if (name.trim() && color.trim()) {
      const user = auth.currentUser;
      const db = getDatabase();
      const childrenRef = ref(db, `/${user.uid}/children`); // Reference to the children node
      const newChildRef = push(childrenRef); // Use push to generate a unique key
      const newChild = {
        name: name, // Use the correct state variable
        age: age, // Include age if needed
        color: color, // Use the correct state variable
      };
  
      set(newChildRef, newChild) // Save the new child data
        try {
          setName(""); // Clear name input after adding
          setAge(""); // Clear age input after adding
          setColor(""); // Clear color input after adding
        }
        catch(error)  {
          console.error("Error adding child: ", error);
        }
    }
  };
  


  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <SafeAreaView style={styles.container}>
       
        <View style={styles.image}>

        <Image
             source={require('./top_corner.png')} 
             
          />
        </View>
        
      <View style={styles.header}>
         <Ionicons name="person-add-outline" size={28} color="rgba(247, 136, 136, 1)" />
        <Text style={styles.title}>Add Child</Text>
      </View>
   
      <Text style = {styles.labelTB}>Child Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
      
      <Text style = {styles.labelTB}>Child Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

      <Text style = {styles.labelTB}>Color</Text>
      <SelectList 
        setSelected={(val) => {
          setSelected(val); // Update the selected state
          setColor(val); // Update the color state
        }}
        data={colorOptions} 
        save="value"
        boxStyles={styles.selectBox} 
        dropdownStyles={styles.dropdown} 
        inputStyles={styles.dDText}
        dropdownTextStyles={styles.dDText} 
    />

        <TouchableOpacity style={styles.addButton} onPress={addChild}>
          <Text style={styles.addButtonText}>Add Child</Text>
        </TouchableOpacity>
    
    <TouchableOpacity style={styles.cancelButton}>
            {/* This views the last two buttons in the page, which are the "Link to child" button and "Save" button */}
            <Text style={{color: 'grey'}}>Go back</Text> 
            </TouchableOpacity>
    </SafeAreaView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 60,
    padding: 10,
  },
  header: {
    alignItems: "center",
    flexDirection: 'row',
    left: 175,
    marginTop: 140,
    marginBottom: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(247, 136, 136, 1)",
    left: 10,
  }, 
  input: {
    height: 40, // setting the height of the pages (how long it it)
    borderColor: '#ccc', // setting the border color to grey
    borderWidth: 1, // setting border width/thickness
    marginBottom: 30, // creating a space between the text box and whats below it
    paddingHorizontal: 15, // creating the horizontal padding for the text to be inputted in the textbox
    borderRadius: 7, // roundness of the edges
    left: 20,
    fontSize: 16,
    borderColor: 'rgba(247, 136, 136, 1)',
    backgroundColor: 'transparent', // setting background color of the textbox
    width: '90%',
    color: 'gray',
  },
  labelTB: {
    color: 'gray',
    fontSize: 17,
    fontWeight: "bold",
    left: 20,
    marginTop: 5,
    marginBottom: 15,
  }, 
  
  addButton: {
    marginTop: 30,
    height: 60,
    padding: 20,
    width: '80%',
    left: 40,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: 'rgba(247, 136, 136, 1)', 
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
    image: {
      position: 'absolute', // this allows us to place the image anywhere on the screen having to adjust it manually to move. it automatically gets placed in top left corner
    },

    cancelButton: {
      backgroundColor: 'transparent', // setting background color to white
      padding: 5, // sets space between text and edge of button
      marginBottom: 10,
      marginHorizontal: 126,
      borderRadius: 5, // sets smoothness of borders
      alignItems: 'center', // align the text of the button to the center
      marginVertical: 5, // sets space between the button and other vertically present components 
      top: 5,
    },
    scrollContainer: {
      flex: 1,
      padding: -10,
    },
    dropdown: {
      backgroundColor: '#fff',
      borderColor: 'rgba(247, 136, 136, 1)',
      borderWidth: 1,
      borderRadius: 7,
      width: '90%',
      left: 20,
      marginBottom: 30,
    },
    dDText: {
      fontSize: 16, // Adjust the font size
      color: 'gray', // Set the text color
    },
    selectBox: {
      borderColor: 'rgba(247, 136, 136, 1)',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#fff',
      padding: 10,
      width: '90%',
      borderRadius: 7,
      left: 20,
      
    },
    boxText: {
      fontSize: 16, // Adjust the font size
      color: 'gray', // Set the text color
      fontWeight: 'bold', // Optional: Make the text bold
    },
});

export default Profile;