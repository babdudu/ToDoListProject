import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput, Platform, Modal, FlatList, TouchableOpacity, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import top_corner from "./assets/top_corner.png";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditingTaskPage = ({ route, navigation }) => {
  const { task } = route.params; // Get the task to edit from route params
  const [taskName, setTaskName] = useState(task.task);
  const [description, setDescription] = useState(task.description);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const [children, setChildren] = useState([]); // State for children
    const [selectedChildId, setSelectedChildId] = useState(null); // State for selected child ID
  const [selectedDate, setSelectedDate] = useState(() => {
    const initialDate = task.date ? new Date(task.date) : new Date();
    initialDate.setHours(10, 0, 0, 0); // Set time to 10:00 AM
    return initialDate;
  });  const [priority, setPriority] = useState(task.priority || 1);
  const [showPicker, setPicker] = useState(false);
  const user = getAuth().currentUser;


 useEffect(() => {
    // get authentication object 
    const auth = getAuth();
    //get the database reference 
    const db = getDatabase();
    //get the current user that is logged in
    const user = auth.currentUser;

    //if there is a user, that is logged in 
    if (user) {
      //create a reference to the children in the database
      const childrenRef = ref(db, `/${user.uid}/children`);
      //gets the current list of children from the database
      onValue(childrenRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const childrenArray = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
          }));
          setChildren(childrenArray); 
        }
      });
    }
  }, []);
  
  // Toggle the date picker visibility
  const toggleDatePicker = () => {
    setPicker((prev) => !prev);
  };

  // Handle date selection
  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const dateSelected = selectedDate || new Date();
      dateSelected.setHours(10, 0, 0, 0);
      setSelectedDate(dateSelected);
      if (Platform.OS === "android") {
        toggleDatePicker(); // Close the picker on Android
      }
    } else {
      toggleDatePicker(); // Close the picker if canceled
    }
  };

  const renderChild = ({ item }) => (
    <TouchableOpacity onPress={() => {
      //based on the child selected, set the selected child ID to the one that was selected
      setSelectedChildId(item.id);
      setModalVisible(false); 
    }}>
      <View style={styles.childContainer}>
      <Text style={styles.childText}>{item.name}</Text>
      </View>
    </TouchableOpacity>

    
  );

  


  // Save the updated task to Firebase
  const saveTask = () => {
  if (!taskName.trim()) {
    alert('Task name cannot be empty!');
    return;
  }

  const db = getDatabase();

  // Save the updated task to the new child first
  const newTaskRef = ref(db, `/${user.uid}/children/${selectedChildId}/tasks/${task.id}`);
  const updatedTask = {
    childId: selectedChildId,
    task: taskName,
    description: description,
    date: selectedDate.toISOString().split("T")[0],
    priority: priority,
    completed: task.completed || false,
  };

  set(newTaskRef, updatedTask)
    .then(() => {
      console.log("Task saved to new child successfully.");

      // Remove the task from the previous child if it had a childId and it's different from the new one
      if (task.childId && task.childId !== selectedChildId) {
        const previousTaskRef = ref(db, `/${user.uid}/children/${task.childId}/tasks/${task.id}`);
        remove(previousTaskRef)
          .then(() => {
            console.log(`Task removed from previous child: ${task.childId}`);
            navigation.goBack();
          })
          .catch((error) => {
            console.error("Error removing task from previous child:", error);
          });
      } else {
        navigation.goBack();
      }
    })
    .catch((error) => {
      console.error("Error saving task to new child:", error);
    });
};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View >
          <Image source={top_corner} style={styles.image}/>
        </View>
        <View style={styles.labelRow}>
          <Ionicons name="create-outline" size={30} color="rgba(247, 136, 136, 1)" />
          <Text style={styles.label}>Edit Task</Text>
        </View>

        <Text style={styles.labelTB}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Input the task name!"
          value={taskName}
          maxLength = {30}
          onChangeText={setTaskName}
        />

        <Text style={styles.descTB}>Description</Text>
        <TextInput
          style={[styles.inputDesc, {height: 100}]}
          placeholder="Describe the task!"
          value={description}
          maxLength = {100}
          multiline={true}
          onChangeText={setDescription}
        />

{/* The code below views the date picker, source from https://www.youtube.com/watch?v=UEfFjfW7Zes*/}
<View>
<View>
  <Text style={styles.dateLabel}>Date</Text>
  {Platform.OS === 'web' ? (
    <input
      type="date"
      value={selectedDate.toISOString().split('T')[0]} // Format date as YYYY-MM-DD
      onChange={(event) => {
        const inputDate = event.target.value;

        // Validate the date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(inputDate)) {
          alert('Invalid date.');
          return;
        }

        // Parse the input date
        const parsedDate = new Date(inputDate);

        // Ensure the year is valid (4 digits)
        if (parsedDate.getFullYear().toString().length > 4) {
          alert('Year cannot exceed 4 digits.');
          return;
        }

        // Update the selected date
        setSelectedDate(parsedDate);
      }}
      min={new Date().toISOString().split('T')[0]} // Restrict to today or later
      onFocus={(event) => event.target.showPicker()} // Open calendar on focus
      style={{
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderColor: '#ff6b6b',
        color: 'gray',
        fontSize: 16,
        width: '100%',
      }}
    />
  ) : (
    <>
      <TextInput
        style={styles.dateTB}
        value={selectedDate.toISOString().split('T')[0]} // Display selected date
        editable={false} // Prevent manual editing
        onPressIn={toggleDatePicker} // Open date picker
      />
      {showPicker && (
        <View
          style={{
            backgroundColor: "rgba(247, 136, 136, 1)",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <DateTimePicker
            mode="date"
            display="spinner"
            value={selectedDate}
            onChange={(event, date) => {
              if (date) {
                setSelectedDate(date); // Update selected date
                toggleDatePicker(); // Close picker
              }
            }}
            minimumDate={new Date()} // Restrict to today or later
          />
        </View>
      )}
    </>
  )}
</View>

  {showPicker && (
    <View
      style={{
        backgroundColor: "rgba(247, 136, 136, 1)",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <DateTimePicker
        mode="date"
        display="spinner"
        value={selectedDate}
        onChange={onChange}
        style={styles.datePicker}
        minimumDate={new Date()}
      />
    </View>
  )}

{/* iOS-specific confirm and cancel buttons */} 
{showPicker && Platform.OS === "ios" && (
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
              <TouchableOpacity style={styles.dateButton} onPress={toggleDatePicker}>
                <Text style={styles.buText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateButton} onPress={toggleDatePicker}>
                <Text style={styles.buText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}


            
        </View>

        <Text style={styles.priorityLabel}>Priority</Text>
        <View style={styles.priorityRow}>
          {[1, 2, 3].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.priorityButton,
                priority === level && styles.selectedPriority(level),
              ]}
              onPress={() => setPriority(level)}
            >
              <Ionicons name="thermometer" size={20} color={level === 1 ? "green" : level === 2 ? "orange" : "red"} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                {/* This views the last two buttons in the page, which are the "Link to child" button and "Save" button */}
                <Text style={styles.buttonText}>Link to Child</Text> 
                </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={{ color: "grey" }}>Go Back</Text>
        </TouchableOpacity>

          <Modal visible={modalVisible} animationType="slide">
                    <View style={styles.modalContainer}>
                         <Image
                                            source={require('./assets/top_corner.png')} 
                                            style={styles.topImage}
                          />

                      <Text style={styles.modalTitle}>Select a Child</Text>
                      <FlatList data={children} renderItem={renderChild} keyExtractor={(item) => item.id} />
                      
                       <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.buttonText}>Close</Text>
                      </TouchableOpacity>

                      
                    </View>
                  </Modal>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "f0f0f0",
    padding: 20,
    paddingTop: 80,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "contain",
    zIndex: 0,              // ensure it's behind other elements
  },
  
  topImage: {
    position: 'absolute',
    width: 260,
    height: 260,
    top: -10,               // position from the top of modal
    left: '30%',           // center horizontally
    transform: [{ translateX: -130 }], // shift back by half width to center perfectly
    zIndex: 1,             // optional: ensures it appears above background
    resizeMode: 'contain'  // clean scaling
  },
  childContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // center text & icon
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,       // more height
    paddingHorizontal: 20,     // more side space
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FD6262",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "100%",              // ⬅️ wider container
    alignSelf: "center",
  },   
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    left: 170,
    marginTop: 50,
  },
  label: {
    fontSize: 30,
    color: "rgb(247, 136, 136)",
    fontWeight: "bold",
    marginLeft: 10,
    
  },
  labelTB: {
    color: "gray",
    fontSize: 17,
    marginTop: 8,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descTB: {
    color: "gray",
    fontSize: 17,
    marginTop: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "rgba(247, 136, 136, 0.61)",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: "white",
    color: "gray",
    fontSize: 16,
  },
  inputDesc: {
    marginTop: 10,
    borderColor: "rgba(247, 136, 136, 0.61)",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 14,
    borderRadius: 7,
    backgroundColor: "white",
    color: "gray",
    minHeight: 90,
    fontSize: 16,
    textAlignVertical: "top",
  },
  dateLabel: {
    marginBottom: 8,
    fontSize: 17,
    color: "gray",
    fontWeight: "bold",
  },
  priorityLabel: {
    fontSize: 17,
    color: "gray",
    fontWeight: "bold",
    marginTop: 8,
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 16,
    left: 1,
  },
  priorityButton: {
    padding: 20,
    marginHorizontal: 30,
  },
  selectedPriority: (level) => ({
    backgroundColor: level === 1 ? "#CCFFCC" : level === 2 ? "#FFE5CC" : "#FFCCCC",
    borderRadius: 7,
  }),
  saveButton: {
    backgroundColor: "rgba(247, 136, 136, 1)",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 18,
  },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 5,
    marginTop: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buText: {
    color: "#fff",
    fontWeight: "bold",
    width: "100%",
    padding: 12,
    height: 40,
  },
  dateTB: {
    height: 50,
    borderColor: "rgba(247, 136, 136, 0.61)",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    color: "gray",
    fontSize: 16,
  },
  datePicker: {
    height: 110,
    marginTop: -10,
  },
  dateButton: {
    paddingHorizontal: 45,
    marginVertical: 5,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: "rgba(247, 136, 136, 1)",
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    position: "absolute",
    top: -100,
    left: -100,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: 'rgba(247, 136, 136, 1)', // sets the color to coral-ish pink
    padding: 15, // sets space between text and edge of button
    borderRadius: 5, // sets smoothness of borders
    alignItems: 'center', // align the text of the button to the center
    marginVertical: 5, // sets space between the button and other vertically present components 
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 200,
    textAlign: 'center' // ✅ makes the title centered

  },
    closeButton: {
    backgroundColor: '#ff6b6b',     // match main button color
    borderRadius: 25,              // match rounded edges
    paddingVertical: 15,           // match height
    alignItems: 'center',
    width: '80%',                  // match consistent width
    alignSelf: 'center',           // center it in modal
    marginTop: 20,
  },  
});

export default EditingTaskPage;