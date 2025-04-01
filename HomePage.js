import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper'; // Import ProgressBar from react-native-paper
import TabBar from '../../components/TabBar'; // Import TabBar component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const tasks = [
  { id: '1', title: 'Task 1', date: '14/2', priority: 'high', assigned: false },
  { id: '2', title: 'Task 2', date: '15/2', priority: 'medium', assigned: true },
  { id: '3', title: 'Task 3', date: '16/2', priority: 'low', assigned: false },
  { id: '4', title: 'Task 4', date: '17/2', priority: 'high', assigned: true },
  { id: '5', title: 'Task 5', date: '18/2', priority: 'medium', assigned: false },
  { id: '6', title: 'Task 6', date: '19/2', priority: 'low', assigned: true },
];

export default function HomeScreen() {
  const navigation = useNavigation(); // Initialize navigation

  const handleViewReport = () => {
    navigation.navigate('InsightsScreen'); // Navigate to InsightsScreen
  };

  return (
    <View style={styles.container}>
      {/* Top Vector Background */}
      <Image source={require("../assets/TopVector.png")} style={styles.topVector} />

      {/* Welcome Section with Profile Image */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome Ahmed</Text> {/* Moved this above profile image */}
        <Image source={require("../assets/Child1.png")} style={styles.profileImage} />
      </View>

      {/* Progress Bar under Completed Tasks */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Task Completion</Text>
        <ProgressBar 
          progress={0.7} // Adjust this to your task completion percentage
          color="#FD6262"
          style={styles.progressBar}
        />
      </View>

      {/* Tasks Section */}
      <View style={styles.taskSection}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>Tasks List</Text>
          <TouchableOpacity onPress={handleViewReport}>
            <Text style={styles.viewReport}>View Report</Text>
          </TouchableOpacity>
        </View>

        {/* Task Box */}
        <View style={styles.taskBox}>
          <View style={styles.taskHeaderRow}>
            <Text style={styles.dailyTasks}>Daily Tasks</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={24} color="black" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="trash-outline" size={24} color="black" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              let priorityImage;
              switch (item.priority) {
                case 'high':
                  priorityImage = require('../assets/high-priority.png'); // Corrected path
                  break;
                case 'medium':
                  priorityImage = require('../assets/medium-priority.png'); // Corrected path
                  break;
                case 'low':
                  priorityImage = require('../assets/low-priority.png'); // Corrected path
                  break;
                default:
                  priorityImage = null;
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
      </View>

      {/* Tab Bar */}
      <TabBar /> {/* Add TabBar at the bottom */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7EFEF",
    flex: 1,
    alignItems: "center",
    paddingBottom: 60, // To avoid overlap with TabBar
  },
  topVector: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  welcomeSection: {
    alignItems: 'center',
    marginTop: 100, // Adjusted to fit text above the image
  },
  profileImage: { 
    width: 120, 
    height: 120, 
    marginTop: 10, // Reduced the margin-top to bring it closer to the text
    borderRadius: 30, 
    resizeMode: "contain" 
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  progressContainer: {
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  progressBar: {
    height: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  taskSection: {
    flex: 1,
    width: '90%',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginTop: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Lower task list header
  },
  taskHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewReport: {
    fontSize: 14,
    color: '#4EC5C5', // Button color
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Underline for button-like appearance
  },
  taskBox: {
    backgroundColor: 'white',
    borderRadius: 13,
    borderColor: "#FD6262", 
    borderWidth: 1,
    padding: 20,
    elevation: 3,
    width: 350,
    height: 355,
    alignSelf: 'center',
  },
  dailyTasks: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  taskInfo: {
    marginLeft: 10,
    flex: 1,
  },
  taskText: {
    fontSize: 14,
  },
  taskDate: {
    fontSize: 12,
    color: 'gray',
  },
  priorityIcon: {
    width: 10,
    height: 20,
  },
});
