import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import TabBar from './TabBar';

const ChildTask = ({ route, navigation }) => {
  const { childId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user && childId) {
      const db = getDatabase();
      const path = `${user.uid}/children/${childId}/tasks`;
      const tasksRef = ref(db, path);

      const unsubscribe = onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tasksArray = Object.entries(data).map(([taskId, taskData]) => ({
            id: taskId,
            ...taskData,
          }));

          setTasks(tasksArray);
          const completed = tasksArray.filter(task => task.completed === true).length;
          setCompletedCount(completed);
          setTotalCount(tasksArray.length);
        } else {
          setTasks([]);
          setCompletedCount(0);
          setTotalCount(0);
        }
      });

      return () => unsubscribe();
    }
  }, [childId]);

  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const renderTodo = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
        {item.task ?? "Unnamed Task"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <Image source={require("./assets/TopVector.png")} style={styles.image} />
      <Text style={styles.header}>Tasks Progress</Text>

      {/* Gradient Progress Bar */}
      <View style={styles.progressBarBackground}>
        <LinearGradient
          colors={['#FFDADA', '#FD6262']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarFill, { width: `${completionPercentage}%` }]}
        />
      </View>

      <Text style={styles.progressText}>{`${completedCount} of ${totalCount} tasks completed`}</Text>

      <FlatList
        data={tasks}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found for this child.</Text>
          </View>
        }
      />

      {/* Always visible TabBar */}
      <TabBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Add space for TabBar
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 140,
    marginBottom: 20,
    textAlign: 'center'
  },
  progressBarBackground: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: 40,
    borderRadius: 20,
  },
  progressText: {
    marginBottom: 20,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 30,
  },
  taskItem: {
    padding: 15,
    borderColor: '#FD6262',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});

export default ChildTask;
