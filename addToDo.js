import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, Image, Modal, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import top_corner from './assets/top_corner.png';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

// The function below defines the main component, where it defines the state of the task name, description, date to be done, and priority
const AddingToDoPage = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [task, setTask] = useState(''); // default value of task is empty string
  const [description, setDescription] = useState(''); // default value of description is empty string
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [priority, setPriority] = useState(0); // Priority in this case is 0 (no priority)
  const [showPicker, setPicker] = useState(false); // State for date picker visibility
  const [children, setChildren] = useState([]); // State for children
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedChildId, setSelectedChildId] = useState(null); // State for selected child ID

  // reading all children from the database
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

  const toggleDatePicker = () => {
    setPicker(!showPicker); // Toggle the date picker
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setSelectedDate(selectedDate); // Set the selected date
      toggleDatePicker();
    }
  };

  // The code below updates the setPriority constant to the new priority level selected
  const prioritySelect = (level) => {
    setPriority(level); // Update the priority based on user selection
  };

  
  // WRITING TO DO LIST TASKS INTO DATABASE
  //https://www.youtube.com/watch?v=9orKRpPMveY&t=1928s (from : 30:40-34:10)
  //https://firebase.google.com/docs/auth/web/manage-users#web-version-8
  //https://github.com/jayisback11/firebase-todo-list/tree/master/src/components

  const writeToDatabase = () => {
    try {

      //ensures that the task name is not empty
      if (!task.trim()) {
        alert('Task name cannot be empty!'); // Show an alert to the user
        return; 
      }
      //ensures that priority is selected
      if (priority === 0) {
        alert('Please select a priority!'); // Show an alert to the user
        return; // Stop the function from proceeding
      }
      //make sure that the task is assigned to a child (a child includes the mom, if she wants to assign something to herself)
      if (!task.trim() || !selectedChildId) {
        alert('Please fill in all fields!'); 
        return; 
      }
  
      const auth = getAuth();
      const db = getDatabase();
      const user = auth.currentUser;
      
      // Reference to the child's tasks
      const tasksRef = ref(db, `/${user.uid}/children/${selectedChildId}/tasks`); 
      // generate a new unique key for the task
      // https://firebase.google.com/docs/database/unity/save-data#:~:text=The%20Push()%20method%20generates,same%20time%20without%20write%20conflicts.
      const newTaskRef = push(tasksRef); 
  
      set(newTaskRef, {
        // Save the selected child's ID
        childId: selectedChildId, 
        //completion state 
        completed: false,
        //selected date
        date: selectedDate.toISOString().split("T")[0],
        //written description
        description: description,
        //selected priority
        priority: priority,
        //selected task name 
        task: task,
      });
  
      alert('Task saved successfully!'); // Indicate success
      // Clear fields after task is saved 
      setTask('');
      setDescription('');
      setSelectedDate(new Date());
    } catch (error) {
      console.error('Error saving task: ', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const renderChild = ({ item }) => (
    <TouchableOpacity onPress={() => {
      //based on the child selected, set the selected child ID to the one that was selected
      setSelectedChildId(item.id);
      setModalVisible(false); 
    }}>
      <Text style={styles.childText}>{item.name}</Text>
    </TouchableOpacity>

    
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={top_corner} style={styles.image} />
        <View style={styles.labelRow}>
          <Ionicons name="add-circle" size={30} color="rgba(247, 136, 136, 1)" />
          <Text style={styles.label}>Add a New Task</Text>
        </View>

        <Text style={styles.labelTB}>Task Name</Text>
        <TextInput style={styles.input} value={task} onChangeText={setTask} />

        <Text style={styles.descTB}>Description</Text>
        <TextInput style={[styles.inputDesc, { height: 100 }]} value={description} onChangeText={setDescription} multiline />

        <Text style={styles.dateLabel}>Date</Text>
        <TextInput style={styles.dateTB} value={selectedDate.toISOString().split("T")[0]} editable={false} onPressIn={toggleDatePicker} />
        {showPicker && (
          <DateTimePicker mode="date" value={selectedDate} onChange={onChange} />
        )}

        <Text style={styles.priorityLabel}>Priority</Text>
        <View style={styles.priorityRow}>
          <TouchableOpacity style={[styles.priorityButton, priority === 1 && styles.selectedPriority(1)]} onPress={() => prioritySelect(1)}>
            <Ionicons name="thermometer" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.priorityButton, priority === 2 && styles.selectedPriority(2)]} onPress={() => prioritySelect(2)}>
            <Ionicons name="thermometer" size={20} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.priorityButton, priority === 3 && styles.selectedPriority(3)]} onPress={() => prioritySelect(3)}>
            <Ionicons name="thermometer" size={20} color="red" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={writeToDatabase}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Link to Child</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ToDoList')}>
          <Text style={{ color: 'grey' }}>Go back</Text>
        </TouchableOpacity>

        {/* Modal for selecting a child */}
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
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
}

// The following code below defines the style (color, appearance, alignment, etc.) of each component in the UI
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'f0f0f0',
    padding: 20,
    paddingTop: 80,
  },
  label: {
    fontSize: 30,
    color: 'rgb(247, 136, 136)',
    position: 'relative',
    zIndex: 1,
    fontWeight: "bold",
    left: 3,
  },
  labelTB: {
    color: 'gray',
    fontSize: 17,
    marginTop: 8,
    fontWeight: "bold",
  }, 
  descTB: {
    color: 'gray',
    fontSize: 17,
    marginTop: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: 'rgba(247, 136, 136, 0.61)',
    marginTop: 8,
    position: 'relative',
    zIndex: 1,
    color: 'gray',
    fontSize: 16,
  },
  inputDesc: {
    marginTop: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: 'rgba(247, 136, 136, 0.61)',
    position: 'relative',
    width: "100%",
    color: 'gray',
    minHeight: 90,
    fontSize: 16,
    textAlignVertical: "top",
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
    zIndex: 1,
  },
  dateLabel: {
    marginBottom: 8,
    fontSize: 17,
    color: 'gray',
    fontWeight: "bold",
    marginTop: 5,
  },
  priorityLabel: {
    fontSize: 17,
    color: 'gray',
    fontWeight: "bold",
    marginTop: 8,
    marginRight: 56,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "contain",     
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    paddingVertical: 4,
    marginBottom: 1,
    borderRadius: 6,
    left: 90,
  },
  priorityButton: {
    padding: 20,
    marginHorizontal: 30,
  },
  selectedPriority: (color) => ({
    backgroundColor: color === 1 ? '#CCFFCC' : color === 2 ? '#FFE5CC' : '#FFCCCC', 
    borderRadius: 7,
  }),
  button: {
    backgroundColor: 'rgba(247, 136, 136, 1)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  saveButton: {
    backgroundColor: 'rgba(247, 136, 136, 1)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 18,
  },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 126,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    top: -3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dateTB: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderColor: 'rgba(247, 136, 136, 0.61)',
    color: 'gray',
    fontSize: 16,
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
  },
  childText: {
    padding: 10,
    fontSize: 18,
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FF6347',
    borderRadius: 5,
    marginTop: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: -10,
  },
});

export default AddingToDoPage;