import React, {useState} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Button, navigation, SafeAreaView, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import SignInScreen from './login';

const SignUpScreen = () => {
  // https://reactnative.dev/docs/intro-react#state
 // https://reactnative.dev/docs/javascript-environment#javascript-syntax-transformers
    
    //creating an array that takes in the email, and setEmail to update the email
    //utilizing the useState hook to set the initial value of the email 
    const [email, setEmail] = useState('');
    //doing the same for password 
    const [password, setPassword] = useState('');
    //creates a loading boolean to show whether a process is in progress or not, and it is initialized as false to start
    const [loading, setLoading] = useState(false);

    //creating a new const and setting it to FIBEBASE_AUTH 
    const auth = FIREBASE_AUTH;
    //creating a new const and setting it to useNavigation() to get the navigation object
    const navigation = useNavigation(); 


  // async function that signs up a user 
  // async can use the await keyword, which is used to pause the execution of the function until the promise is resolved
  // https://blog.expo.dev/react-native-meets-async-functions-3e6f81111173
  // https://firebase.google.com/docs/auth/web/start
    const signUp = async () => {
      //indicates that the process is in progress 
        setLoading(true);
        try {
            //creating a new const and setting it to createUserWithEmailAndPassword
            //using await, the function will not execute until the promise is resolved
            const response = await createUserWithEmailAndPassword(auth, email, password);
            //saves the credientials in the console 
            console.log(response);
        } catch (e) {
            //logs error 
            consolele.log(e);
            //displays line 
            alert('sign in failed'+ e.message);
        }finally{
          //when its done return the loading back to false 
          setLoading(false);
        }
    };

  return (
    <View style={styles1.screen}>   
      <View style={styles1.content}>
        <Image
          source={require('./assets/top_corner.png')} 
          style={styles1.topImage}
          accessibilityLabel="Person with clipboard"
        />
      
    <View style1={styles1.contentContainer}>
    <View style={styles1.headerContainer}>
      <Text style={styles1.headerTitle}>Welcome Onboard</Text>
      <Text style={styles1.headerSubtitle}>
        Let's help you stay organized, focused, and get things done effortlessly
      </Text>
    </View>

    <View style={styles1.formContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        {/* importing icons from available library */}
        <Ionicons name="mail-outline" size={20} color="#888" padding = '10' />
        {/* when email is entered, call setEmail() to store it = create account */}
        <TextInput
          style={styles1.input}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" padding = '10' />
        <TextInput
          value={password}
          style={styles1.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

    {/* checks loading variable if it is then check if the user wants to register (through tappinfg the button), if not <> its empty */}
    { loading ? (
        <ActivityIndicator size="large" color="#ff6b6b" /> 
    ):(
        <>
        
        <TouchableOpacity style={styles1.button} onPress={signUp}>
        <Text style={styles1.buttonText}>Register</Text>
        </TouchableOpacity>
        </>
    )}
    </View>
    {/* if the user has an account, they can sign in */}
    <View style={styles1.linkContainer}>
      <Text style={styles1.linkText}>Already have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles1.link}>Sign In</Text>
      </TouchableOpacity>
    </View>
  </View>
  </View>
  </View>

  );
};

const styles1 = StyleSheet.create({
  //SCREEN LAYOUT ELEMENTS
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', 
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#e7f9f9',
    },
    content: {
      alignItems: 'center',
      padding: 20,
  },

  //IMAGE
    topImage: {
      position: 'absolute', 
      width: 260,          
      height: 260,  
      top: -280, 
      right: 90, 
      left: -20,     
    },
  
    //TEXT 
    headerContainer: {
        marginBottom: 20,
    },
      headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      headerSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
      },
    
    //INPUT FORM ELEMENTS
      formContainer: {
        marginBottom: 20,
      },
      input: {
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
      },

      //BUTTONS
      button: {
        backgroundColor: '#ff6b6b',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      linkText: {
        color: '#888',
      },
      link: {
        color: '#ff6b6b',
        fontWeight: 'bold',
      },
      

});

export default SignUpScreen;