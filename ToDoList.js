import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // AntDesign icons
import { useNavigation } from "@react-navigation/native";
import TabBar from "../../components/TabBar"; // Your TabBar component

const ToDoList = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([
    { title: "Buy groceries", completed: false },
    { title: "Finish project", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Toggle task completion
  const toggleTodoCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Add new task
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { title: newTodo, completed: false }]);
      setNewTodo("");
      Keyboard.dismiss();
    }
  };

  // Delete task
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Render each task
  const renderTodo = ({ item, index }) => (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
        <AntDesign
          name={item.completed ? "checksquare" : "checksquareo"}
          size={24}
          color={item.completed ? "#FD6262" : "gray"}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.todoText,
          { textDecorationLine: item.completed ? "line-through" : "none" },
        ]}
      >
        {item.title}
      </Text>
      {/* Trash Bin Icon */}
      <TouchableOpacity onPress={() => deleteTodo(index)} style={styles.trashIcon}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List</Text>
      </View>

      {/* List of To-Dos */}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Input Section */}
      <KeyboardAvoidingView style={styles.footer} behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.addTodo} onPress={addTodo}>
          <AntDesign name="plus" size={16} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Bottom Tab Bar */}
      <TabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7EFEF",
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FD6262",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: "space-between", // Added space for trash icon
  },
  todoText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    marginBottom: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    borderColor: "#FD6262",
    backgroundColor: "#fff",
  },
  addTodo: {
    backgroundColor: "#FD6262",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 50,
  },
  trashIcon: {
    padding: 5,
    borderRadius: 50,
    
  },
});

export default ToDoList;
