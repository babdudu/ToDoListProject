import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState(""); 
  const [age, setAge] = useState(""); 
  const [color, setColor] = useState(""); 
  const auth = getAuth();


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
    <SafeAreaView style={styles.container}>
       
        <Image
             source={require('./assets/top_corner.png')} 
             style={styles.topImage}
             
          />
      <View style={styles.header}>
        <Text style={styles.title}>Child</Text>
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
        <TextInput
          style={styles.input}
          placeholder="I associate my child with the color"
          value={color}
          onChangeText={setColor}
        />

        <TouchableOpacity style={styles.addButton} onPress={addChild}>
          <Text style={styles.addButtonText}>Add Child</Text>
        </TouchableOpacity>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7EFEF",
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  childContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FD6262",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  childText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
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
    width: '80%',
  },
  labelTB: {
    color: 'gray',
    fontSize: 17,
    marginTop: 8,
    fontWeight: "bold",
  }, 
  // The style below is strictly for the date label
  dateLabel: {
    marginBottom: 15, // setting distance between the date and whats below it
    fontSize: 16, // setting font size
    color: '#333', // setting font color to black
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
    topImage: {
      position: 'absolute', 
      width: 260,          
      height: 260,  
      top: -180, 
      right: 90, 
      left: -50,    
    },
});

export default Profile;