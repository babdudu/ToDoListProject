import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TabBar from '../../components/TabBar';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const UsersScreen = () => {
  const navigation = useNavigation(); // Get the navigation prop

  return (
    <View style={styles.container}>
      <Image source={require("../assets/TopVector.png")} style={styles.image} />

      <View style={styles.imagesContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SomeMomScreen')}> {/* Replace with actual screen */}
          <Image source={require("../assets/Mom.png")} style={styles.image4} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Child1Screen')}> {/* Replace with actual screen */}
          <Image source={require("../assets/Child1.png")} style={styles.image5} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Child2Screen')}> {/* Replace with actual screen */}
          <Image source={require("../assets/Child2.png")} style={styles.image6} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Child3Screen')}> {/* Replace with actual screen */}
          <Image source={require("../assets/Child3.png")} style={styles.image7} />
        </TouchableOpacity>
      </View>

      <Text style={styles.usersText}>Select User</Text> 

      {/* View Insights Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Insights')}>
        <Text style={styles.buttonText}>View Insights</Text>
      </TouchableOpacity>

      {/* Tab Bar */}
      <TabBar /> {/* Add the TabBar component here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7EFEF",
    flex: 1,
    alignItems: "center", // Centers everything inside the container
    paddingBottom: 60, // Add padding to the bottom to prevent overlap with the tab bar
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 230, // Adjust margin as needed
    width: '80%', // Set width to manage alignment
  },
  image4: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
    resizeMode: "contain",
    margin: 10, // Space between images
  },
  image5: {
    width: 120,
    height: 120,
    borderRadius: 50,
    resizeMode: "contain",
    margin: 10,
  },
  image6: {
    width: 120,
    height: 120,
    borderRadius: 50,
    resizeMode: "contain",
    margin: 10,
  },
  image7: {
    width: 120,
    height: 120,
    borderRadius: 50,
    resizeMode: "contain",
    margin: 10,
  },
  usersText: {
    position: "absolute",
    top: 170,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000000",
  },
  button: {
    marginTop: 70,
    width: 150, // Button width
    height: 50, // Button height
    backgroundColor: '#FD6262', // Button color
    borderRadius: 30, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000', // Text color for button
    fontSize: 12,
  },
});

export default UsersScreen;