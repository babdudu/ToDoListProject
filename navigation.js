import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth
import TabBar from './TabBar';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Set the current user information
    }
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert("Signed Out", "You have been signed out successfully.");
        navigation.navigate("Start"); // Navigate to the login screen
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('./assets/top_corner.png')}
          style={styles.image}
        />
      </View>

      {/* Display User Information */}
      {user && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userText}>Logged in as:</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("userList")}
      >
        <Text style={styles.buttonText}>Go to Users Page</Text>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#E7EFEF",
  },
  userInfoContainer: {
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: "#FD6262", 
    alignItems: 'center', 
    marginBottom: 20, 
    width: '90%', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  userEmail: {
    fontSize: 18, 
    color: '#666',
  },
  button: {
    borderColor: 'rgba(247, 136, 136, 1)',
    backgroundColor: 'transparent',
    padding: 15,
    borderWidth: 2,
    height: 100,
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
  button: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    width: 260,
    height: 260,
    top: -330,
    right: 90,
    left: -200,
  },
});

export default ProfilePage;
