import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the trash can icon

const userList = () => {
  const [children, setChildren] = useState([]);
  const [childName, setChildName] = useState("");

  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const momRef = ref(db, `/${user.uid}/children/mom`);
      try {
        set(momRef, { name: "Mom", color: "gray" });
      } catch (error) {
        console.error("Error adding Mom:", error);
      }

      const childrenRef = ref(db, `/${user.uid}/children`);
      const unsubscribe = onValue(childrenRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const childrenArray = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
            color: data[key].color || "gray",
          }));
          setChildren(childrenArray);
        } else {
          setChildren([]);
        }
      });

      return () => unsubscribe();
    }
  }, [auth]);

  const renderChild = ({ item }) => (
    <View style={styles.childContainer}>
      <View style={styles.childRow}>
        {/* Circle Icon */}
        <View style={[styles.colorCircle, { backgroundColor: item.color }]} />

        {/* Child Name */}
        <TouchableOpacity
          style={styles.childNameContainer}
          onPress={() => {
            if (item.name === "Mom") {
              navigation.navigate("ToDoList");
            } else {
              navigation.navigate("ChildTasks", { childId: item.id });
            }
          }}
        >
          <Text style={styles.childText}>{item.name}</Text>
        </TouchableOpacity>

        {/* Trash Can Icon */}
        {item.name !== "Mom" && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteChild(item.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#FD6262" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const deleteChild = (id) => {
    const user = auth.currentUser;
    const db = getDatabase();
    if (user) {
      const childRef = ref(db, `/${user.uid}/children/${id}`);
      remove(childRef);
      try {
        setChildren((prevChildren) =>
          prevChildren.filter((child) => child.id !== id)
        );
      } catch (error) {
        alert("Error deleting child: ", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Family Members</Text>
      </View>

      <FlatList
        data={children}
        renderItem={renderChild}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("addANewProfile")}
      >
        <Text style={styles.profileButtonText}>Add a new child</Text>
      </TouchableOpacity>
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
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between", // Space between child name and trash icon
  },
  title: {
    alignSelf: "center",      // center horizontally
    marginTop: 20,             
    fontSize: 25,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  

  childContainer: {
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
    width: "85%",
    alignSelf: "center",
  },
  
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10, // Space between the circle and the child name
    marginLeft: 0, // Ensure the circle is flush with the left edge
  },
  childNameContainer: {
    flex: 1, // Take up available space between the circle and the trash can
  },
  childText: {
    fontSize: 18,
    color: "#333",
    textAlign: "left", // Align text to the left
  },
  deleteButton: {
    marginLeft: 10, // Adds space between the name and trash icon
  },
  profileButton: {
    backgroundColor: "#ff6b6b",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    width: "80%",
    marginLeft: 50,
  },
  profileButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default userList;