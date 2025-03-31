import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import top_corner from './top_corner.png'; // importing the image for background
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Provides the icons needed for the UI


const ProfilePage = () => {
  return (
    
    <View style={styles.container}>

      <View style={styles.image}>
            <Image
              source={top_corner}
            />
           </View>

           <View style={styles.labelRow}>
      <Ionicons name="navigate-circle-outline" size={40} color="rgba(247, 136, 136, 1)" /> 
      <Text style={styles.label}>Navigation Page</Text>
     </View>
    

      <TouchableOpacity
        style={styles.button}>
      <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Insights</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },

  label: {
    color: 'rgba(247, 136, 136, 1)',
    fontSize: 30,
    fontWeight: 'bold',
    top: -50,
    marginTop: 100,
    left: 5,
  },
  button: {
    borderColor: 'rgba(247, 136, 136, 1)', // Change the border color here
    backgroundColor: 'transparent',
    padding: 15,
    borderWidth: 2, // Add this to make the border visible
    height: 160,
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    
  }, 
  image: {
    top: -10,
    left: -10,
    position: 'absolute', // this allows us to place the image anywhere on the screen having to adjust it manually to move. it automatically gets placed in top left corner
  },
  labelRow: {
    flexDirection: 'row', // makes child elements (elements created under it) line up horizontally
    alignItems: 'center', // aligns child elements to the center
    marginTop: 70,    // creates space between it and top components
    paddingVertical: 4,
    marginBottom: 1, // creates a space between it and the bottom components
    borderRadius: 6,
  },
});

export default ProfilePage;
