import React from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'; 
import TabBar from './TabBar'; 
import { useNavigation } from '@react-navigation/native';

const InsightsScreen = () => {
return (
<View style={styles.container}>

<Image source={require("./assets/top_corner.png")} style={styles.image} />


<Image source={require("./assets/Percentage.png")} style={styles.Image2} />

<Image source={require("./assets/Graph.png")} style={styles.Image3} />


<Text style={styles.insightsText}>Insights</Text>

{/* Boxes Container */}
<View style={styles.boxContainer}>
<TouchableOpacity style={styles.box}>
<Text style={styles.boxText}>Ongoing</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.box}>
<Text style={styles.boxText}>In-Progress</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.box}>
<Text style={styles.boxText}>Completed</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.box}>
<Text style={styles.boxText}>Cancelled</Text>
</TouchableOpacity>
</View>

{/* Button Container */}
<View style={styles.progressContainer}>
<TouchableOpacity style={styles.button}>
<Text style={styles.buttonText}>View all</Text>
</TouchableOpacity>
</View>

{/* Tab Bar */}
<TabBar /> {/* Add the TabBar component here */}
</View>
);
};

const styles = StyleSheet.create({
container: {
backgroundColor: "f0f0f0",
flex: 1,
alignItems: "center", // Centers everything inside the container
},
image: {
position: "absolute",
top: 0,
left: 0,
width: 200,
height: 200,
resizeMode: "contain",
},
Image2: {
position: "absolute",
top: 480, // Adjust to position the image correctly
alignSelf: "center",
width: 120, // Adjust width as needed
height: 120, // Adjust height as needed
resizeMode: "contain",
},
Image3: {
position: "absolute",
top: 580, // Adjust to position the image correctly
alignSelf: "center",
width: 350, // Adjust width as needed
height: 170, // Adjust height as needed
resizeMode: "contain",
},
insightsText: {
position: "absolute",
top: 130,
alignSelf: "center",
fontSize: 25,
fontWeight: 'bold',
color: "#000000",
},
boxContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-around',
marginTop: 200, // Adjust as needed
width: '90%', // Adjust width for boxes
},
box: {
backgroundColor: '#FD6262', // Box color
padding: 20,
margin: 10,
borderRadius: 10,
width: 150, // Updated width
height: 70, // Updated height
alignItems: 'center',
justifyContent: 'center',
},
boxText: {
color: '#000000', // Text color
fontSize: 14,
},
progressContainer: {
alignItems: 'center',
marginTop: 30,
},
button: {
width: 340, // Button width
height: 50, // Button height
backgroundColor: '#FFFFFF', // White background
borderRadius: 10, // Rounded corners
alignItems: 'center',
justifyContent: 'center',
marginTop: -15,
},
buttonText: {
color: '#000000', // Text color for button
fontSize: 14,
},
});

export default InsightsScreen;