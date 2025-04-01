import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const TabBar = () => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tabButton}>
        <Icon name="home" size={30} color="#4EC5C5" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Icon name="plus" size={30} color="#4EC5C5" />
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Icon name="cog" size={30} color="#4EC5C5" />
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