import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { ProgressBar } from 'react-native-paper';


const ChildTask = ({ route, navigation }) => {
  //used to pass information between screens
  const { childId } = route.params;
  // to store the tasks 
  const [tasks, setTasks] = useState([]);
  //to store the completion status of the tasks 
  const [completedCount, setCompletedCount] = useState(0);
  //to store the total number of tasks
  const [totalCount, setTotalCount] = useState(0);
  const auth = getAuth();


  useEffect(() => {
    //gets the current user that is logged in 
    const user = auth.currentUser;
    //ensures that the user is logged in and the childId is not null
    if (user && childId) {
    
      const db = getDatabase();
      const path = `${user.uid}/children/${childId}/tasks`;
      const tasksRef = ref(db, path);


      const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
        if (data) {
            // Convert the object to an array of tasks
          const tasksArray = Object.entries(data).map(([taskId, taskData]) => ({
            id: taskId,
            ...taskData,
          }));

          //updates the tasks state variable with the tasksArray
          setTasks(tasksArray);
            // Calculate completed tasks and total tasks
          const completed = tasksArray.filter(task => task.completed === true).length;
            //updates the state with the number of completed tasks
          setCompletedCount(completed);
          //updates the state with the total number of tasks
          setTotalCount(tasksArray.length);

        } else {
          setTasks([]);
          setCompletedCount(0);
          setTotalCount(0);
        }
      });

      return () => unsubscribe();
    } else {
      
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
      <Text style={styles.header}>Tasks Progress</Text>
      <ProgressBar progress={completionPercentage / 100} color="#4CAF50" style={styles.progressBar} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  progressText: {
    marginBottom: 20,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 30,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
