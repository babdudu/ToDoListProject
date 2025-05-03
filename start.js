import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet, Button, SafeAreaView } from 'react-native';
//functional component 
//takes in navigation property which helps in moving to other screens 
const Start = ({ navigation }) => { 
  return (
    // the style container is used to style the app using the content of the style sheet 
    //ensures that the content is inside the container 
    <View style={styles.container}>
      {/* the content of the page */}
      <View style={styles.content}>
        {/* the circles in the background*/}
        <Image
          source={require('./assets/top_corner.png')}
          style={styles.topImage}
        />
        {/* the title  in the first page */}
        <Text style={styles.title}>Accomplish</Text>
        {/* the image in the first page */}
        <Image
          source={require('./assets/startPage.png')}
          style={styles.mainImage}
        />
        {/* the subtitle in the first page */}
        <Text style={styles.subtitle}>All About Getting Things Done...</Text>

        {/*https://www.youtube.com/watch?v=eu-8OlWbwjA&t=3987s*/}
        {/*Split Login/Signup Button */}
        <View style={styles.splitButtonContainer}>
          {/* LOGIN Button */}
          {/* make the component respond to user taps */}
          {/* when the login button is pressed using the navigation object it should navigate to the login page */}
          <TouchableOpacity
            style={styles.loginButton}
            //when button is pressed, navigate to sign in page
            onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
          {/* SIGNUP Button */}
          {/* when the signup button is pressed using the navigation object it should navigate to the signup page */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
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

  //IMAGES
  //https://reactnative.dev/docs/images
  mainImage: {
    width: 250,
    height: 250,
    //adds space below the image for space 
    margin: 200,
    position: 'absolute',

  },
  topImage: {
    position: 'absolute', 
    width: 260,
    height: 260,
    top: -150,
    right: 90,
    left: -40,

  },

  //TEXT ELEMENTS
  //https://reactnative.dev/docs/layout-props#marginvertical
  //https://reactnative.dev/docs/text-style-props#textalign
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
    color: '#E04851',
    padding: 40,
    position: 'absolute',
    top: 75,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    fontStyle: 'italic',
    fontFamily: 'Verdana',
    paddingTop: 500,

  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Verdana',
  },
  signupButtonText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Verdana',
  },

  //BUTTONS
  // the main container holding the two buttons 
  splitButtonContainer: {
    backgroundColor: '#fffff',
    //indicates that the item should be set horizontally
    flexDirection: 'row',
    //rounding the corner 
    borderRadius: 30,
    //if a component is larger than its container, it will be clipped
    overflow: 'hidden',
    //thickness of boarder 
    borderWidth: 1,
    //border color 
    borderColor: '#FD6262',
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
    borderRadius: 30,
    width: '100%',
  },
  //the signup part of the button container 
  signupButton: {
    flex: 1,
    backgroundColor: '#fffff',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default Start;
