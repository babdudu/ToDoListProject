import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

const tasks = [
  { id: '1', title: 'Task 1', date: '14/2', priority: 'high', assigned: false },
  { id: '2', title: 'Task 2', date: '15/2', priority: 'medium', assigned: true },
  { id: '3', title: 'Task 3', date: '16/2', priority: 'low', assigned: false },
  { id: '4', title: 'Task 4', date: '17/2', priority: 'high', assigned: true },
  { id: '5', title: 'Task 5', date: '18/2', priority: 'medium', assigned: false },
  { id: '6', title: 'Task 6', date: '19/2', priority: 'low', assigned: true },
];

export default function HomeScreen() {
  const howAreYouPosition = 150;
  const quotePosition = 200;

  return (
    <ThemedView style={styles.container}>
     <Image 
     source={require('../../assets/images/Image.png')} 
     style={[styles.Image, { resizeMode: 'cover' }]} 
      />

      <TouchableOpacity style={styles.searchIconContainer}>
        <Ionicons name="search" size={35} color="black" />
      </TouchableOpacity>

      <View style={[styles.headerContainer, { marginTop: howAreYouPosition }]}>
        <Image source={require('../../assets/images/profile-pic.png')} style={styles.profileImage} />
        
        <View style={styles.howAreYouContainer}>
          <Text style={styles.howAreYouText}>How are you?</Text>
          <View style={styles.emotionsContainer}>
            <TouchableOpacity><Text style={styles.emoji}>😊</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.emoji}>😐</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.emoji}>☹️</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={[styles.quoteText, { marginTop: 10, marginBottom: 200 , marginLeft: 70}]}>
        "You've got this, never give up!"
      </Text>

      <View style={styles.taskSection}>
        <Text style={styles.taskTitle}>Task List</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.taskBox}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            let priorityImage;
            if (item.priority === 'high') {
              priorityImage = require('../../assets/images/high-priority.png');
            } else if (item.priority === 'medium') {
              priorityImage = require('../../assets/images/medium-priority.png');
            } else {
              priorityImage = require('../../assets/images/low-priority.png');
            }

            return (
              <TouchableOpacity style={styles.taskItem}>
                <Ionicons name="square-outline" size={20} color="black" />
                <View style={styles.taskInfo}>
                  <Text style={styles.taskText}>{item.title}</Text>
                  <Text style={styles.taskDate}>{item.date}</Text>
                </View>
                <Image source={priorityImage} style={styles.priorityIcon} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4EC5C5',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  Image: {
    width: 300,  
    height: 290,  
    position: 'absolute', // positioned in the background
    top: 0,
    left: 0,
  },
  
  howAreYouContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 20,
  },
  howAreYouText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: -50,
  },
  emotionsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  emoji: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  searchIconContainer: {
    position: 'absolute',
    top: 60,
    right: 15,
    padding: 15,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  taskSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -150,
    paddingHorizontal: 20,
  },
  taskBox: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 20,
    elevation: 3,
    width: 380,
    alignSelf: 'center',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  taskInfo: {
    marginLeft: 10,
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginLeft: 0,
  },
  taskDate: {
    fontSize: 12,
    color: 'gray',
  },
  priorityIcon: {
    width: 5,
    height: 11,
    marginLeft: 10,
  },
});