import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

const tasks = [
  { id: '1', title: 'Task 1' },
  { id: '2', title: 'Task 2' },
  { id: '3', title: 'Task 3' },
  { id: '4', title: 'Task 4' },
  { id: '5', title: 'Task 5' },
  { id: '6', title: 'Task 6' },
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Blue Background Section */}
      <View style={styles.blueBackground}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput placeholder="Search Placeholder" style={styles.searchInput} />
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Image source={require('../../assets/images/profile-pic.png')} style={styles.profileImage} />
          <Text style={styles.welcomeText}>Welcome Sarah Ahmedi</Text>
        </View>
      </View>

      {/* Good Morning Text */}
      <Text style={styles.goodMorningText}>Good Morning</Text>

      {/* Clock */}
      <View style={styles.clockContainer}>
        <View style={styles.clockFace}>
          <View style={styles.clockHand} />
        </View>
      </View>

      {/* Tasks Section */}
      <View style={styles.taskSection}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>Tasks List</Text>
          <Text style={styles.viewReport}>View report</Text>
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
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.taskItem} 
               onPress={() => alert(`Clicked on ${item.title}`)}
              >
              <Ionicons name="square-outline" size={20} color="black" />
              <Text style={styles.taskText}>{item.title}</Text>
              </TouchableOpacity>

            )}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EFEF',
    paddingHorizontal: 16,
    paddingBottom: 155,
    paddingTop: 60,
  },
  blueBackground: {
    width: 400,
    height: 250,
    backgroundColor: '#4EC5C5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  welcomeSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  goodMorningText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  clockFace: {
    width: 120,
    height: 120,
    backgroundColor: '#FD6262BA',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockHand: {
    width: 2,
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
    top: 20,
  },
  taskSection: {
    flex: 1,
    width: '90%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginTop: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    color: 'blue',
  },
  taskBox: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 10,
    elevation: 3,
    alignSelf: 'center',
    width: 347,
    height: 252,
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
  },
  taskText: {
    marginLeft: 10,
    fontSize: 14,
  },
});