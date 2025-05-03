import React, {useState} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button, SafeAreaView, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import homepage from './homepage';


const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const signIn = async () => {
      setLoading(true);
      
      //Basic email validation
      if (!email || !email.includes('@')) {
          alert('Please enter a valid email address.');
          setLoading(false);
          return;
      }
      
      try {
          await signInWithEmailAndPassword(auth, email, password);
          alert('Sign in successful');
          navigation.navigate('userList'); 
      } catch (e) {
          console.log(e);
          if (e.code === 'auth/invalid-credential') {
              alert('Incrorrect email or password. Please try again.');
          }  
          else {
              alert('Sign in failed: ' + e.message);
          }
      } finally {
          setLoading(false);
      }
  };

  return (
    //makes sure that when the keyboard shows up, it doesn't cover the input fields
    <KeyboardAvoidingView
    //choosws 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1}}
  >
    
  <View style={styles2.screen}>   
    <View style={styles2.content}>
      <View style1={styles2.contentContainer}>
        <Image
          source={require('./assets/top_corner.png')} 
          style={styles2.topImage}
        />
    <View style={styles2.headerContainer}>
    <Text style={styles2.headerTitle}>Welcome Back</Text>
    </View>

     <Image
        source={require('./assets/signIn.png')} 
        style={styles2.displayImage}
      />
  

     {/* Email input field */}
    <View style={styles2.formContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <Ionicons name="mail-outline" size={20} color="#888" padding = '10'/>
        <TextInput
          style={styles2.input}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

    {/* Password input field */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15  }}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" padding = '10' />
        <TextInput
          value={password}
          style={styles2.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

    {/* Checks if the loading variable is true  */}
    {loading ? (
      // Show loading indicator when loading is true
        <ActivityIndicator size="large" color="#ff6b6b" /> 
    ):(
      // If its not loading then show the sign in button
        //react fragment to group multiple elements without adding extra view
        <> 
    
         <TouchableOpacity style={styles2.button} onPress={signIn}>
         <Text style={styles2.buttonText}>Sign in</Text>
         </TouchableOpacity>

        </>
    
    )}
  
  </View>


    <View style={styles2.linkContainer}>
      <Text style={styles2.linkText}>Don't have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles2.link}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </View>
  </View>
  </View>
  </KeyboardAvoidingView>
  

  );
};

const styles2 = StyleSheet.create({
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
      marginBottom: 20,
      marginTop: 20,
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
      top: -180, 
      right: 90, 
      left: -50,    
    },
    displayImage: {
      width: 200,
      height: 240,
      alignSelf: 'center',
    },
    
    //TEXTS
    headerContainer: {
      marginBottom: 10,
      marginTop: 40,
      marginLeft: 25,
      alignContent: 'center',
    },
    headerTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    headerSubtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: '#888',
    },
    
    formContainer: {
      marginBottom: 20,
      alignItems: 'center', 
    },

    //INPUT FIELD
    input: {
      height: 50,
      width: '90%', 
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      marginBottom: 20, 
    },

    //BUTTONS
    button: {
      backgroundColor: '#ff6b6b',
      borderRadius: 25,
      paddingVertical: 15,
      alignItems: 'center',
      width: '80%', 
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



export default SignInScreen;
