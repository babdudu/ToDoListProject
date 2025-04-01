import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native";
import { ref, onValue, set, remove } from "firebase/database";
import { auth, database } from './Firebase';
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for different icons
import { useNavigation } from '@react-navigation/native';
import TabBar from '../../components/TabBar'; // Import TabBar component

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [mood, setMood] = useState(null); // State to hold selected mood
  const [quote, setQuote] = useState(""); // State to hold motivational quote
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const db = database;
      const todosRef = ref(db, `/${user.uid}`);

      const unsubscribe = onValue(todosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const todosArray = Object.keys(data).map((key) => ({
            id: key,
            task: data[key].task,
            description: data[key].description,
            date: data[key].date,
            completed: data[key].completed || false,
            priority: data[key].priority,
          }));
          setTodos(todosArray);
        } else {
          setTodos([]);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const toggleTodoCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);

    const user = auth.currentUser;
    if (user) {
      const todoRef = ref(database, `/${user.uid}/${id}`);
      set(todoRef, { ...updatedTodos.find(todo => todo.id === id) }).catch((error) => {
        console.error("Error updating task:", error);
      });
    }
  };

  const deleteTodo = (id) => {
    const user = auth.currentUser;
    if (user) {
      const todoRef = ref(database, `/${user.uid}/${id}`);
      remove(todoRef).catch((error) => {
        console.error("Error deleting task:", error);
      });
    }
  };

  const renderTodo = ({ item }) => {
    let priorityColor = item.priority === 3 ? "red" : item.priority === 2 ? "orange" : "green";

    return (
      <TouchableOpacity onPress={() => navigation.navigate("EditingToDoPage", { task: item })}>
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => toggleTodoCompleted(item.id)} style={styles.checkbox}>
            {item.completed && <View style={styles.checkedCheckbox} />}
          </TouchableOpacity>
          <View style={styles.todoContent}>
            <Text style={[styles.todoText, { textDecorationLine: item.completed ? "line-through" : "none" }]}>
              {item.task}
            </Text>
            <Text style={styles.todoDate}>{item.date}</Text>
          </View>
          <Ionicons name="thermometer" size={20} color={priorityColor} style={styles.priorityIcon} />
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    // Display a motivational quote based on the selected mood
    if (selectedMood === "happy") {
      setQuote("You're doing amazing! Keep it up!");
    } else if (selectedMood === "neutral") {
      setQuote("Stay focused, great things are coming your way!");
    } else if (selectedMood === "sad") {
      setQuote("Tough times don't last, but tough people do. Keep going!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome Ahmed</Text>
      </View>

      {/* How Are You Feeling Section */}
      <View style={styles.moodContainer}>
        <Text style={styles.moodText}>How are you feeling today?</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => handleMoodSelection("happy")}>
            <MaterialIcons name="mood" size={40} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoodSelection("neutral")}>
            <MaterialIcons name="sentiment-neutral" size={41} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoodSelection("sad")}>
            <MaterialIcons name="mood-bad" size={40} color="red" />
          </TouchableOpacity>
        </View>
        {mood && <Text style={styles.quoteText}>{quote}</Text>}
      </View>

      {/* Top Vector Image */}
      <Image source={require("../assets/TopVector.png")} style={styles.image} />

      {/* Header Title */}
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List</Text>
      </View>

      {/* List of To-Dos */}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Tab Bar */}
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
    alignItems: "center", // Centers everything inside the container
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  welcomeSection: {
    alignItems: 'center',
    marginVertical: 10, // Optional, to give some space before the "How are you feeling" section
    marginTop: 80,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  header: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  moodContainer: {
    alignItems: "center",
    marginTop: 30, // Adjust this to reduce the gap between sections
  },
  moodText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 25,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 30,
  },
  quoteText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 20
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
    justifyContent: "space-between",
    width: "100%",
  },
  todoContent: {
    flex: 1,
    marginLeft: 10,
  },
  todoText: {
    fontSize: 18,
    color: "#333",
  },
  todoDate: {
    fontSize: 12,
    color: "lightgray",
  },
  deleteText: {
    color: "red",
    marginLeft: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    width: 16,
    height: 16,
    backgroundColor: "#FD6262",
  },
  priorityIcon: {
    marginLeft: 10,
  },
});

export default ToDoList;
