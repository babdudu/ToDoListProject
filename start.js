import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet, Button, SafeAreaView } from 'react-native';
import SignUpScreen from './signup';

//first functional component 
//takes in navigation property which helps in moving to other screens 
const Start = ({navigation}) => { // 
  return (
    // the style container is used to style the app using the content of the style sheet 
   //ensures that the content is inside the container 
   <View style={styles.container}> 
    {/* the content of the page */}
      <View style={styles.content}>

      {/* the circles in the background */}
      <Image
            source={require('./assets/top_corner.png')} // Use a valid image URL
            style={styles.topImage}
            accessibilityLabel="Person with clipboard"
          />
      
      {/* the image in the first page */}
      <Image
            source={require('./assets/image 1.png')} // Use a valid image URL
            style={styles.mainImage}
            accessibilityLabel="Person with clipboard"
      />
      
      {/* the TEXT in the first page */}
      <Text style={styles.title}>Accomplish</Text>

      <Text style={styles.subtitle}>All About Getting Things Done...</Text>

      <Text style={styles.description}>
          The ultimate to-do list and task management app designed 
          to help you stay organized, focused, and productive. Plan, 
          track, and complete your tasks effortlessly.
      </Text>

    {/*Split Login/Signup Button */}
        <View style={styles.splitButtonContainer}>
  
         {/* LOGIN Button */}
         {/* make the component respond to user taps */}
         {/* when the login button is pressed using the navigation object it should navigate to the login page */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('SignInScreen')}
          >
          <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* SIGNUP Button */}
          {/* when the signup button is pressed using the navigation object it should navigate to the signup page */}
          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Text style={styles.signupButtonText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>
      

    </View>

  );
};



//https://reactnative.dev/docs/stylesheet
const styles = StyleSheet.create({

  //SCREEN LAYOUT ELEMENTS
  //to ensure that the content fills the entire page 
  //https://reactnative.dev/docs/flexbox
  container: {
    // indicates that I want the items to fill over the entire page
    flex: 1,
    //to align the content to the center of the container (horizontal axis of the page)
    justifyContent: 'center',
    //to align the items to the center of the container (vertical axis of the page)
    alignItems: 'center',
    //setting the background color of the page
    backgroundColor: '#f0f0f0', 
  },
  
  //this is for the content of the page and it doesnt concern the entire page
  content: {
    //aligns the items to the center horizontally 
    alignItems: 'center',
    //spacing between the content 
    padding: 20,
  },
  
  //IMAGE
  //https://reactnative.dev/docs/images
  mainImage: {
    width: 200,
    height: 240,
    //adds space below the image for space 
    marginBottom: 20,
  },
  topImage: {
    position: 'absolute', // Enable absolute positioning
    width: 260,          
    height: 260,  
    top: -180, 
    right: 90, 
    left: -20,      
  },

  //TEXT ELEMENTS
  //https://reactnative.dev/docs/layout-props#marginvertical
  //https://reactnative.dev/docs/text-style-props#textalign
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    //adds a margin value to the top and bottom of the text
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    //adds space below the text
    marginBottom: 10,
  },
  description: {
  fontSize: 16,
  //aligns text to the center
  textAlign: 'center',
  //adds space below the text
  marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  signupButtonText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 14,
  },

  //BUTTONS
  // the main container holding the two buttons 
  splitButtonContainer: {
    //indicates that the item should be set horizontally
    flexDirection: 'row',
    //rounding the corner 
    borderRadius: 30,
    //if a component is larger than its container, it will be clipped
    overflow: 'hidden',
    //thickness of boarder 
    borderWidth: 1,
    //border color 
    borderColor: '#E0E0E0',
    //adds space above the buttons
    marginTop: 15,
    width: '80%',
  },
  //the login part of the button container 
  loginButton: {
    flex: 1,
    backgroundColor: '#FD6262',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
   //the signup part of the button container 
  signupButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Start;