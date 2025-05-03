import React, { useState, useEffect } from "react";
import { View, Text,  ScrollView, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons'; // Provides the icons needed for the UI
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const addANewProfile = () => {
    const navigation = useNavigation(); // Get the navigation object
  const [children, setChildren] = useState([]); // Array to hold the children data
  //to hold child name 
  const [name, setName] = useState(""); 
  //to set child age 
  const [age, setAge] = useState(""); 
  //to set child color
  const [color, setColor] = useState("");
  //for selected value 
  const [selected, setSelected] = useState(""); 

  const auth = getAuth();

  //color options 
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
    //using trim to leave out any necessary spaces 
    if (name.trim()) {
      const user = auth.currentUser;
      const db = getDatabase();

      //https://www.youtube.com/watch?v=9orKRpPMveY&t=1928s

      //reference the children section in the database 
      const childrenRef = ref(db, `/${user.uid}/children`); 
      //generates a new key for reference 
      const newChildRef = push(childrenRef); 
      const newChild = {
        name: name, 
        age: age, 
        color: color, 
      };
  
      //save the new child data 
      set(newChildRef, newChild)
        try {
          //clear input names 
          setName(""); 
          setAge(""); 
          setColor("");
        }
        catch(error)  {
          console.error("Error adding child: ", error);
        }
    }
  };
  


  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <SafeAreaView style={styles.container}>
       
        <View >

        <Image
             source={require('./assets/top_corner.png')} 
             style={styles.image}
             
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
    
    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
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
    backgroundColor: "f0f0f0",
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
    marginLeft: 10,
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
    position: "absolute",
    top: -80,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "contain",
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

export default addANewProfile;
