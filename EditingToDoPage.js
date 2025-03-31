import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const EditingToDoPage = ({ route, navigation }) => {
  const { task } = route.params; // Get the task data from navigation parameters
  const [taskName, setTaskName] = useState(task.task);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority?.toString() || "1");
  const auth = getAuth();

  const saveTask = () => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const taskRef = ref(db, `/${user.uid}/${task.id}`);

      const formattedDate = date ? date.toISOString().split("T")[0] : '';

      const updatedTask = {
        task: taskName,
        description: description,
        date: formattedDate,
        priority: parseInt(priority),
        completed: task?.completed || false, 
      };

      set(taskRef, updatedTask)
        try {
          navigation.goBack(); // Navigate back to the To-Do List
        }
        catch(error) {
          console.error("Error updating task:", error);
        }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Date"
          value={date}
          onChangeText={setDate}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Priority</Text>
        <TextInput
          style={styles.input}
          placeholder="1 = Low, 2 = Medium, 3 = High"
          value={priority}
          onChangeText={setPriority}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditingToDoPage;