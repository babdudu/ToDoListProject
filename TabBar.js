import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
 


const TabBar = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ToDoList')}>
        <Icon name="home" size={30} color="#4EC5C5" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('AddingToDoPage')}>
        <Icon name="plus" size={30} color="#4EC5C5" />
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Icon name="user" size={30} color="#4EC5C5" onPress={() => navigation.navigate('ProfilePage')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'transparent', 
    position: 'absolute', // Position it absolutely
    bottom: 10, // Align to the bottom
    left: 0,
    right: 0, // Full width
  },
  tabButton: {
    alignItems: 'center',
  },
});

export default TabBar;